import { useState, useEffect } from "react";
import { Button, Typography, notification, Image, Input, Spin } from "antd";
import api from "../api/employees";
import useVote from "../hooks/useVote";
import logo from "../assets/logo.png";
import Question from "../components/Question";
import SelectEmployees from "../components/SelectEmployees";

const { Title } = Typography;
const { TextArea } = Input;

export default function Form({ setStep }) {
  const { registerVote } = useVote();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState("idle");
  const [rating, setRating] = useState({
    employeeID: null,
    rating: 0,
    experienceRating: 0,
    comment: "",
  });

  useEffect(() => {
    const getEmployees = async () => {
      setIsLoading(true);
      try {
        const data = await api.getEmployees();
        setEmployees(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getEmployees();
  }, []);

  const handleSubmit = async () => {
    try {
      setRequestStatus("loading");
      const avgRating = (rating.rating + rating.experienceRating) / 2;
      await api.rateEmployee(rating.employeeID, avgRating, rating.comment);
      setRequestStatus("done");
      registerVote();
      notification.success({
        message: "Gracias!",
        description: "Tu calificación ha sido registrada.",
      });
      setStep(1);
    } catch (error) {
      console.log(error);
      setRequestStatus("error");
      notification.error({
        message: "Oops!",
        description: "Algo salio mal intenta de nuevo.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Image
        alt="logo"
        src={logo}
        loading="lazy"
        width={200}
        height={200}
        preview={false}
        draggable={false}
      />
      <Title level={3} style={{ textAlign: "center" }}>
        Como fue tu experiencia en Franco?
      </Title>
      <div className="form-container">
        <SelectEmployees
          setSelectedEmployee={(id) => setRating({ ...rating, employeeID: id })}
          selectedEmployee={rating.employeeID}
          employees={employees}
        />
        <Question
          value={rating.rating}
          handleChange={(value) => setRating({ ...rating, rating: value })}
          question="Como calificarias a tu camarero?"
        />
        <Question
          value={rating.experienceRating}
          handleChange={(value) =>
            setRating({ ...rating, experienceRating: value })
          }
          question="Como calificarias tu experiencia en FRANCO?"
          subtitle="Tu honestidad nos ayuda a mejorar."
        />

        <TextArea
          value={rating.comment}
          onChange={(e) => setRating({ ...rating, comment: e.target.value })}
          placeholder="Comentarios o sugerencias (opcional)"
          autoSize={{ minRows: 3, maxRows: 5 }}
          style={{ marginBottom: 16 }}
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={
            !rating.employeeID || !rating || requestStatus === "loading"
          }
          loading={requestStatus === "loading"}
          block
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}
