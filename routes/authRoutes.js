import express from "express";
import {
  renderLogin,
  renderSignup,
  signup,
  login,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.get("/login", renderLogin);

router.get("/", renderSignup);
router.post("/signup", signup);
router.get("/logout", logout);

export default router;
