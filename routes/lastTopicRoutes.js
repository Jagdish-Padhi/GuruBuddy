import express from "express";
import Schedule from "../models/schedule.js";
import LastTopic from "../models/lastTopic.js";
import {
  renderSched,
  getReminder,
  checkAfterLec,
} from "../controllers/schedController.js";

const router = express.Router();

//Rendering the form page
router.get("/lastTopic", async (req, res) => {
  const schedules = await Schedule.find({});

  //combined array of subject and topic
  const data = await Promise.all(
    schedules.map(async (schedule) => {
      const lastTopic = await LastTopic.findOne({ scheduleId: schedule._id });
      return {
        subject: schedule.subject,
        topic: lastTopic ? lastTopic.topic : "Not filled form yet",
      };
    })
  );

  const subjects = [...new Set(schedules.map((s) => s.subject))];

  res.render("lastTopic", { subjects, title: "Last Topic Form", data });
});

//submission of form
router.post("/lastTopic", async (req, res) => {
  try {
    const { subject, topic } = req.body;

    const schedule = await Schedule.findOne({ subject });

    if (schedule) {
      await LastTopic.findOneAndUpdate(
        { scheduleId: schedule._id },
        { topic: topic },
        { upsert: true }
      );
    }
    renderSched(req, res, "Form submitted successfully!");
  } catch (error) {
    console.log(error);
    renderSched(
      req,
      res,
      null,
      "Something went wrong! Please try again later."
    );
  }
});

//sending remainder checkUp data to frontend to show or not popUp of remainder
router.get("/getReminder", getReminder);

//after lecture popUp to fill the form

router.get("/checkAfterLec", checkAfterLec);

export default router;
