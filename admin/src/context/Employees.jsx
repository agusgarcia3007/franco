import { createContext, useContext, useState, useEffect } from "react";
import { notification } from "antd";
import api from "../api/employees";
import { useLocation } from "react-router-dom";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { pathname } = useLocation();

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

  const getReviews = async () => {
    setLoading(true);
    try {
      const data = await api.getComments();
      setReviews(data);
    } catch (error) {
      notification.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pathname !== "/login") {
      getEmployees();
      getReviews();
    }
  }, [pathname]);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        setEmployees,
        loading,
        setLoading,
        getEmployees,
        reviews,
        getReviews,
      }}
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
