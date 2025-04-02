import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];

connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Enable if using cookies
  })
);

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));
