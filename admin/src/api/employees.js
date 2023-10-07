import http from "../config/http";

const getEmployees = async () => {
  const { data } = await http.get("/employees");
  return data;
};

const createEmployee = async (name) => {
  const { data } = await http.post("/employees", { name });
  return data;
};

const deleteEmployee = async (id) => {
  const { data } = await http.delete(`/employees/${id}`);
  return data;
};

const editEmployee = async (id, name) => {
  const { data } = await http.patch(`/employees/${id}`, { name });
  return data;
};

export default {
  getEmployees,
  createEmployee,
  deleteEmployee,
  editEmployee,
};
