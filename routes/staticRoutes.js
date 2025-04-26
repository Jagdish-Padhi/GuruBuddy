import express from "express";

import isAuthenticated from "../middleware/auth.js";
const router = express.Router();

router.get("/home", isAuthenticated, async (req, res) => {
  return res.render("home", { title: "Home", scsMsg: null, errMsg: null });
});

router.get("/summary", (req, res) => {
  return res.render("summary", { title: "Summarizer" });
});
router.get("/future", (req, res) => {
  return res.render("future", { title: "Upcoming Features" });
});
router.get("/ans", (req, res) => {
  return res.render("ans", { title: "Answer sheet feedback" });
});
router.get("/summary", (req, res) => {
  return res.render("summary", { title: Summarizer });
});

export default router;
