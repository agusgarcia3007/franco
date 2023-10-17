import { Modal, Button, notification } from "antd";
import api from "../api/employees";
import { useEmployees } from "../context/Employees";

const Reset = () => {
  const { getEmployees, reviews } = useEmployees();
  const handleReset = async () => {
    Modal.confirm({
      title: "¿Estás seguro?",
      content:
        "Todos los datos serán reseteados y esta acción no puede deshacerse.",
      okText: "Sí, eliminar",
      okType: "danger",
      cancelText: "No, cancelar",
      async onOk() {
        try {
          await api.resetRatings();
          notification.success({ message: "Ratings reseteados" });
          getEmployees();
        } catch (error) {
          notification.error({ message: "Error al resetear los ratings" });
        }
      },
    });
  };

  return (
    <Button
      danger
      type="default"
      onClick={handleReset}
      disabled={!reviews.length > 0}
    >
      Reset Ratings
    </Button>
  );
};

export default Reset;
