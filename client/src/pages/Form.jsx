/* eslint-disable */
import { useState, useEffect } from "react";
import { Select, Button, Typography, Rate, notification, Image } from "antd";
import api from "../api/employees";
import useVote from "../hooks/useVote";
import logo from "../assets/logo.png";

const { Option } = Select;
const { Title } = Typography;

export default function Form({ setStep }) {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [rating, setRating] = useState(0);
  const [requestStatus, setRequestStatus] = useState("idle");
  const { registerVote } = useVote();

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await api.getEmployees();
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };
    getEmployees();
  }, []);

  const handleSubmit = async () => {
    try {
      setRequestStatus("loading");
      await api.rateEmployee(selectedEmployee, rating);
      setRequestStatus("done");
      registerVote();
      notification.success({
        message: "Thank you!",
        description: "Your rating was submitted successfully.",
      });
      setStep(1);
    } catch (error) {
      console.log(error);
      setRequestStatus("error");
      notification.error({
        message: "Oops!",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="app-container">
      <Image
        alt="logo"
        src={logo}
        width={200}
        preview={false}
        draggable={false}
      />
      <Title level={3} style={{ textAlign: "center" }}>
        Como fue tu experiencia en Franco?
      </Title>
      <div className="form-container">
        <Typography.Text>Quien te atendio?</Typography.Text>
        <Select
          value={selectedEmployee}
          onChange={setSelectedEmployee}
          placeholder="Elige una persona"
          style={{ width: "100%", marginBottom: 16 }}
        >
          {employees.map((emp) => (
            <Option key={emp.employee.id} value={emp.employee.id}>
              {emp.employee.name}
            </Option>
          ))}
        </Select>
        <Typography.Text>Que puntuacion le darias?</Typography.Text>
        <Rate
          allowHalf
          value={rating}
          onChange={setRating}
          style={{ marginBottom: 16, marginTop: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={!selectedEmployee || !rating || requestStatus === "loading"}
          loading={requestStatus === "loading"}
          block
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
