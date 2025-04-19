import express from "express";
import { Router } from "express";
import isAuthenticated from "../middleware/auth.js";
const router = express.Router();
 
router.get("/home", isAuthenticated, async (req, res) => {
  return res.render("home", { title: "Home", scsMsg: null, errMsg: null });
});

 

export default router;
