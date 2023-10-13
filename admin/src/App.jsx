import { Routes, Route, useNavigate } from "react-router-dom";
import { Employees, Reviews, Login } from "./pages";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Employees />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reviews/:id" element={<Reviews />} />
    </Routes>
  );
};

export default App;
