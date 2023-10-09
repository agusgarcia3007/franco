import { Button, notification, Modal, Input } from "antd";
import { useState } from "react";
import api from "../api/employees";
import { useNavigate } from "react-router-dom";
import ExclamationCircleOutlined from "@ant-design/icons";
import { useEmployees } from "../context/Employees";

const EmployeeManager = ({ employee, actionType }) => {
  const { getEmployees } = useEmployees();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeName, setEmployeeName] = useState(employee?.name || "");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEmployeeName(employee ? employee.name : "");
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      switch (actionType) {
        case "create":
          await api.createEmployee(employeeName);
          notification.success({ message: "Personal agregado correctamente!" });
          navigate("/");
          break;
        case "edit":
          await api.editEmployee(employee.id, employeeName);
          notification.success({
            message: "Información actualizada correctamente!",
          });
          break;
        case "delete":
          await api.deleteEmployee(employee.id);
          notification.success({ message: "Empleado eliminado correctamente" });
          break;
        default:
          throw new Error("Acción no soportada");
      }
      getEmployees();
      closeModal();
    } catch (error) {
      notification.error({
        message: "Oops!",
        description: "Algo salió mal. Intenta de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getModalContent = () => {
    switch (actionType) {
      case "create":
        return (
          <Input
            placeholder="Nombre"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        );
      case "edit":
        return (
          <Input
            placeholder="Nuevo nombre"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        );
      case "delete":
        return (
          <>
            <ExclamationCircleOutlined />
            <p>¿Estás seguro que deseas eliminar a {employeeName}?</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Button
        danger={actionType === "delete"}
        type="primary"
        onClick={openModal}
      >
        {actionType === "create"
          ? "Añadir Personal"
          : actionType === "edit"
          ? "Editar"
          : "Eliminar"}
      </Button>
      <Modal
        title={`${
          actionType.charAt(0).toUpperCase() + actionType.slice(1)
        } Empleado`}
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{ loading, danger: actionType === "delete" }}
        confirmLoading={loading}
        onCancel={closeModal}
      >
        {getModalContent()}
      </Modal>
    </div>
  );
};

export default EmployeeManager;
