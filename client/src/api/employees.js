import http from "../config/http";

const getEmployees = async () => {
  const { data } = await http.get("/employees");
  return data;
};

const rateEmployee = async (employeeID, rating) => {
  const { data } = await http.post("/rating", {
    employeeID,
    rating,
  });
  return data;
};

export default {
  getEmployees,
  rateEmployee,
};
