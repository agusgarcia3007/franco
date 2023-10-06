import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/connectDB.js";
import ratingRoutes from "./src/routes/rating.js";
import employeesRoutes from "./src/routes/employees.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api", ratingRoutes);
app.use("/api", employeesRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
