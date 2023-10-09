import { createContext, useContext, useState, useEffect } from "react";
import { notification } from "antd";
import api from "../api/employees";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEmployees = async () => {
    try {
      setLoading(true);
      const data = await api.getEmployees();
      setEmployees(data);
    } catch (error) {
      notification.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{ employees, setEmployees, loading, setLoading, getEmployees }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

//eslint-disable-next-line
export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployees must be used within a EmployeeProvider");
  }
  return context;
};
