import express from "express";
import Schedule from "../models/schedule.js";
import { renderSched } from "../controllers/schedController.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.get("/sched", isAuthenticated, (req, res) => {
  const { scsMsg = null, errMsg = null } = req.query;
  renderSched(req, res, scsMsg, errMsg);
});

router.post("/sched", isAuthenticated, async (req, res) => {
  const { day, subject, division, from, to } = req.body;

  if (!day || !subject || !division || !from || !to) {
    const msg = encodeURIComponent("Please enter all details!");
    res.redirect("/sched?errMsg=" + msg);
  }

  try {
    const schedule = new Schedule({
      teacherId: req.userId,
      day,
      subject,
      division,
      from,
      to,
    });
    await schedule.save();

    const msg = encodeURIComponent("Schedule saved successfully!");
    res.redirect("/sched?scsMsg=" + msg);
  } catch (err) {
    console.error(err);
    const msg = encodeURIComponent(
      "Something went wrong! Please try again later."
    );
    res.redirect("/sched?errMsg=" + msg);
  }
});

router.delete("/sched/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Schedule.findByIdAndDelete(id);
    const msg = encodeURIComponent("Schedule deleted successfully!");
    res.redirect("/sched?scsMsg=" + msg);
  } catch (err) {
    console.error("Error deleting schedule:", err);
    const msg = encodeURIComponent(
      "Something went wrong! Please try again later."
    );
    res.redirect("/sched?errMsg=" + msg);
  }
});

//for reset button working

router.delete("/sched", async (req, res) => {
  try {
    const schedule = await Schedule.findOne({});

    if (!schedule) {
      const msg = encodeURIComponent("Already schedule is empty!");
      res.redirect("/sched?errMsg=" + msg);
    }

    await Schedule.deleteMany({});
    const msg = encodeURIComponent("All schedules deleted successfully!");
    res.redirect("/sched?scsMsg=" + msg);
  } catch (err) {
    console.error("Error deleting all schedules:", err);
    const msg = encodeURIComponent(
      "Something went wrong! Please try again later."
    );
    res.redirect("/sched?errMsg=" + msg);
  }
});

export default router;
