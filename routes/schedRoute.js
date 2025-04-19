import express from "express";
import Schedule from "../models/schedule.js";

const router = express.Router();

router.get("/sched", async (req, res) => {
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

    res.render("sched", { days, scheduleMap, title: "Schedules"});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Loading schedules");
  }
});

router.post("/sched", async (req, res) => {
  const { day, subject, division, from, to } = req.body;

  if (!day || !subject || !division || !from || !to) {
    return res.status(400).send("Missing fields");
  }

  try {
    const schedule = new Schedule({ day, subject, division, from, to });
    await schedule.save();
    res.redirect("/sched");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving schedule");
  }
});

router.delete("/sched/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Schedule.findByIdAndDelete(id);
    res.redirect("/sched");
  } catch (err) {
    console.error("Error deleting schedule:", err);
    res.status(500).send("Error deleting schedule");
  }
});

export default router;
