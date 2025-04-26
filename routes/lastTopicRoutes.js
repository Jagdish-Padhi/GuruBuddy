import express from "express";
import Schedule from "../models/schedule.js";
import LastTopic from "../models/lastTopic.js";
import {
  getReminder,
  checkAfterLec,
  renderLastTopic,
} from "../controllers/schedController.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

//Rendering the last topic form page
router.get("/lastTopic", isAuthenticated, renderLastTopic);

//submission of form
router.post("/lastTopic", isAuthenticated, async (req, res) => {
  try {
    const { scheduleId, topic } = req.body;

    console.log("submitted data", req.body);

    const schedule = await Schedule.findOne({ _id: scheduleId });

    console.log("Matching schedule:", schedule);

    if (scheduleId) {
      await LastTopic.findOneAndUpdate(
        { scheduleId },
        { topic, submitted: true },
        { upsert: true, new: true }
      );
    }
    const msg = encodeURIComponent("Form submitted successfully!");
    res.redirect("/lastTopic?scsMsg=" + msg);
  } catch (error) {
    console.log(error);
    const msg = encodeURIComponent("Submission failed, try again later!");
    res.redirect("/lastTopic?errMsg=" + msg);
  }
});

//sending remainder checkUp data to frontend to show or not popUp of remainder
router.get("/getReminder", isAuthenticated, getReminder);

//after lecture popUp to fill the form
router.get("/checkAfterLec", isAuthenticated, checkAfterLec);

export default router;
