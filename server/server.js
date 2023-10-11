import express from "express";
import dotenv from "dotenv";
import ratingRoutes from "./routes/rating.js";
import employeesRoutes from "./routes/employees.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ status: "online" });
});

app.use("/api", ratingRoutes);
app.use("/api", employeesRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
