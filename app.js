import methodOverride from "method-override";
import expressEjsLayouts from "express-ejs-layouts";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import staticRoutes from "./routes/staticRoutes.js";
import schedRoutes from "./routes/schedRoute.js";
import aiRoutes from "./routes/aiRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from 'express-session';

const app = express();
const PORT = 3000;
dotenv.config();

//Ejs rendering settings
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressEjsLayouts);
app.set("layout", "layout");

// for chating with ai
app.use(session({
  secret: 'your-secret-key',  // can be any string
  resave: false,
  saveUninitialized: true
}));


// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/teacher")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(methodOverride('_method'));

//Routes direction
app.use("/", authRoutes);
app.use("/", staticRoutes);
app.use("/", schedRoutes);
app.use("/", aiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
