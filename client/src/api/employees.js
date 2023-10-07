import http from "../config/http";

const getEmployees = async () => {
  const { data } = await http.get("/employees");
  return data;
};

const rateEmployee = async (employeeID, rating, comment) => {
  const { data } = await http.post("/rating", {
    employeeID,
    rating,
    comment,
  });
  return data;
};

export default {
  getEmployees,
  rateEmployee,
};
