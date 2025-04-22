import Schedule from "../models/schedule.js";
import LastTopic from "../models/lastTopic.js";

//Render Schedules page
export const renderSched = async (req, res, scsMsg = null, errMsg = null) => {
  try {
    const schedules = await Schedule.find().lean();
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const scheduleMap = {};
    days.forEach((day) => (scheduleMap[day] = []));

    if (schedules.length > 0) {
      schedules.forEach((s) => {
        if (scheduleMap[s.day]) {
          scheduleMap[s.day].push(s);
        }
      });
    }

    res.render("sched", {
      days,
      scheduleMap,
      title: "Schedules",
      scsMsg,
      errMsg,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Loading schedules");
  }
};

//For lecture remainder data sending to frontend

export const getReminder = async (req, res) => {
  console.log("🔍 API Hit: sched/getReminder");
  const nowIST = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  const now = new Date(nowIST);
  console.log("🕒 Now (IST):", now.toString());

  const currentDay = now.toLocaleString("en-US", { weekday: "long" });
  const currentTime = now.toTimeString().slice(0, 5);

  const schedule = await Schedule.findOne({
    day: currentDay,
    from: currentTime,
  });

  if (schedule) {
    const lastTopic = await LastTopic.findOne({ scheduleId: schedule._id });

    const msg = `You have ${schedule.subject} lecture. Last time you taught till ${lastTopic?.topic || "Not filled the form"}`;

    return res.json({ showRemainder: true, message: msg });
  }

  res.json({ showRemainder: false });
};

//After 5 min of lecture

export const checkAfterLec = async (req, res) => {
  console.log("🔍 API Hit: sched/checkAfterLec");

  const nowIST = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  const now = new Date(nowIST);
  console.log("🕒 Now (IST):", now.toString());

  const currentDay = now.toLocaleString("en-US", { weekday: "long" });
  const currentTime = now.toTimeString().slice(0, 5);

  const schedules = await Schedule.find({ day: currentDay });

  for (let s of schedules) {
    const [hour, min] = s.to.split(":").map(Number);
    const lectureEnd = new Date();

    console.log("📘 Lecture End + 5 min:", lectureEnd.toString());

    lectureEnd.setHours(hour);
    lectureEnd.setMinutes(min + 5);

    if (now >= lectureEnd) {
      const topic = await LastTopic.findOne({ scheduleId: s._id });

      if (!topic) {
        console.log("🚨 No LastTopic found for:", s.subject);
        return res.json({
          showPopup: true,
          subject: s.subject,
        });
      }
    }
  }

  res.json({ showPopup: false });
};
