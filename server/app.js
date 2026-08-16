import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import noteModerationRoutes from "./routes/noteModerationRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("<h1>Hello <h2>")
});

//auth routes
app.use("/api/auth", authRoutes);

//notes routes
app.use("/api/notes", noteRoutes);

//categoryRoutes
app.use("/api/categories", categoryRoutes);

//admin routes
app.use("/api/admin/notes", noteModerationRoutes);

app.use(errorMiddleware);

export default app;
