import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ratingRoutes from "./routes/rating.js";
import employeesRoutes from "./routes/employees.js";
import commentsRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const whitelist = [
  "http://localhost:3001",
  "http://localhost:3002",
  "https://francosurvey.vercel.app",
  "https://francosurvey-admin.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send({ status: "online" });
});

app.use("/api", ratingRoutes);
app.use("/api", employeesRoutes);
app.use("/api", commentsRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
