import Schedule from "../models/schedule.js";
import LastTopic from "../models/lastTopic.js";

//Render Schedules page
export const renderSched = async (req, res, scsMsg = null, errMsg = null) => {
  try {
    const schedules = await Schedule.find({ teacherId: req.userId }).lean();
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

//Render lastTopic page
export const renderLastTopic = async (
  req,
  res,
  scsMsg = null,
  errMsg = null
) => {
  try {
    const schedules = await Schedule.find({ teacherId: req.userId });

    const data = await Promise.all(
      schedules.map(async (schedule) => {
        const lastTopic = await LastTopic.findOne({ scheduleId: schedule._id });

        return {
          subject: schedule.subject,
          topic: lastTopic ? lastTopic.topic : "Not filled the form yet",
          division: schedule.division,
          scheduleId: schedule._id.toString(),
        };
      })
    );

    // unique subjects list
    const subjects = [...new Set(schedules.map((s) => s.subject))];

    //mapping subjects to division
    const subDivMap = {};
    schedules.forEach((s) => {
      if (!subDivMap[s.subject]) subDivMap[s.subject] = new Set();
      subDivMap[s.subject].add(s.division);
    });

    //converted sets into arrays for rendering in ejs
    for (let sub in subDivMap) {
      subDivMap[sub] = [...subDivMap[sub]];
    }

    const successMessage =
      typeof req.query.scsMsg === "String" ? req.query.scsMsg : "";
    const errorMessage =
      typeof req.query.errMsg === "string" ? req.query.errMsg : "";

    return res.render("lastTopic", {
      subjects,
      subDivMap,
      data,
      title: "Last topic form",
      scheduleData: data,
      scsMsg: successMessage,
      errMsg: errorMessage,
    });
  } catch (error) {
    console.error("Error rendering lastTopic:", error);
    res.status(500).send("Internal Server Error");
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
    teacherId: req.userId,
    from: currentTime,
  });

  if (schedule) {
    await LastTopic.findOneAndUpdate(
      { scheduleId: schedule._id },
      { submitted: false },
      { upsert: true, new: true }
    );

    const lastTopic = await LastTopic.findOne({ scheduleId: schedule._id });

    const topicText =
      lastTopic?.topic ?
        `Last time, you had taught till "${lastTopic.topic}".`
      : `Last time you had not filled the form after lecture. Please remember to fill it this time `;

    const eng = `You have a ${schedule.subject} lecture now. ${topicText}`;

    const hindiTopicText =
      lastTopic?.topic ?
        `पिछली बार आपने "${lastTopic.topic}" तक पढ़ाया था।`
      : `पिछली बार आपने क्लास के बाद फॉर्म नहीं भरा था।  इस बार ज़रूर भर दीजिए, याद दिला रहे हैं `;

    const hindi = `अभी आपकी ${schedule.subject} की क्लास है। ${hindiTopicText}`;

    return res.json({ showRemainder: true, engMsg: eng, hindiMsg: hindi });
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

  const schedules = await Schedule.find({
    teacherId: req.userId,
    day: currentDay,
  });

  for (let s of schedules) {
    const [hour, min] = s.to.split(":").map(Number);
    const lectureEnd = new Date();

    console.log("📘 Lecture End + 5 min:", lectureEnd.toString());

    lectureEnd.setHours(hour);
    lectureEnd.setMinutes(min + 5);

    if (now >= lectureEnd) {
      const topic = await LastTopic.findOne({ scheduleId: s._id });

      if (!topic || topic.submitted === false) {
        console.log("🚨 No LastTopic found for:", s.subject);
        return res.json({
          showPopup: true,
          subject: s.subject,
          scheduleId: s._id,
        });
      }
    }
  }

  res.json({ showPopup: false });
};
