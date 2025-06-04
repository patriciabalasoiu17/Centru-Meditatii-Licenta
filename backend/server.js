// server.js
import "dotenv/config"; // runs dotenv.config() automatically
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Your route modules
import studentRoutes from "./routes/StudentRoutes.js";
import teacherRoutes from "./routes/TeacherRoutes.js";
import classEventsRoutes from "./routes/ClassEventRoutes.js";
import groupRoutes from "./routes/GroupRoutes.js";
import userRoutes from "./routes/UsersRoutes.js";

// Clerk middleware
import { clerkMiddleware } from "@clerk/express";

// express app
const app = express();

app.use(cors());
app.use(express.json());

// Attach Clerk auth middleware
app.use(clerkMiddleware());

// Simple logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Mount your routes
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/classEvent", classEventsRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/users", userRoutes);

// Connect to Mongo
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Connected to MongoDB & listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
