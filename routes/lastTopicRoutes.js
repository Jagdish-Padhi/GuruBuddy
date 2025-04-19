import express from "express";
// import lastTopic from "../models/lastTopic";

const router = express.Router();

router.get("/lastTopic", (req, res) => {
  res.render("lastTopic", { title: "Last Topic Form" });
});


export default router;