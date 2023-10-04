import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
