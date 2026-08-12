import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import noteModerationRoutes from "./routes/noteModerationRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));


// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Notes Platform API is running",
  });
});

//auth routes
app.use("/api/auth", authRoutes);

//notes routes
app.use("/api/notes", noteRoutes);

//admin routes
app.use("/api/admin/notes", noteModerationRoutes);


app.use(errorMiddleware);

export default app;