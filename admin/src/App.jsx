import { useState } from "react";
import { Modal, Input, Table, message, Rate, Button, Dropdown } from "antd";
import api from "../api/employees";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Admin = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [password, setPassword] = useState("");

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [newName, setNewName] = useState(null);

  const showEditModal = (employee) => {
    setCurrentEmployee(employee);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (employee) => {
    setCurrentEmployee(employee);
    setIsDeleteModalVisible(true);
  };

  const getEmployees = async () => {
    try {
      setLoading(true);
      const data = await api.getEmployees();
      setEmployees(data);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOk = () => {
    if (password === "admin5840") {
      setIsModalVisible(false);
      getEmployees();
    } else {
      message.error("Contraseña incorrecta. Inténtalo de nuevo.");
    }
  };

  const handleEdit = async () => {
    try {
      const data = await api.editEmployee(currentEmployee.employee.id, newName);
      Notification.success({
        message: "Thank you!",
        description: data.message,
      });
      setIsEditModalVisible(false);
      setCurrentEmployee(null);
      setNewName(null);
      getEmployees();
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const data = await api.deleteEmployee(currentEmployee.employee.id);
      Notification.success({
        message: "Thank you!",
        description: data.message,
      });
      setIsDeleteModalVisible(false);
      setCurrentEmployee(null);
      getEmployees();
    } catch (error) {
      Notification.error({
        message: "Oops!",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const columns = [
    { title: "Nombre", dataIndex: ["employee", "name"], key: "name" },
    {
      title: "ID",
      dataIndex: ["employee", "id"],
      key: "id",
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Calificación Promedio",
      dataIndex: "avgRating",
      key: "avgRating",
      render: (avgRating) => (
        <>
          <Rate allowHalf disabled value={avgRating} /> <span>{avgRating}</span>
        </>
      ),
    },
    {
      title: "Cantidad de Votos",
      dataIndex: "voteCount",
      key: "voteCount",
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Acciones",
      key: "action",
      render: (text, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: "Editar",
                onClick: () => showEditModal(record),
              },
              {
                key: "delete",
                label: "Eliminar",
                onClick: () => showDeleteModal(record),
              },
            ],
          }}
        >
          <span>
            <Button type="link">Acciones</Button>
          </span>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title="Por favor, introduce la contraseña"
        open={isModalVisible}
        onOk={handleOk}
        style={{ padding: "10px" }}
        onCancel={() => (window.location.href = "/")}
      >
        <Input.Password
          placeholder="Contraseña"
          style={{ margin: "10px 10px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>

      {!isModalVisible && (
        <>
          <h1>Panel de Admin</h1>
          <Button type="primary" style={{ marginBottom: 16 }}>
            Añadir Empleado
          </Button>
          <Table
            dataSource={employees}
            columns={columns}
            loading={loading}
            rowKey="id"
          />
        </>
      )}

      <Modal
        title="Editar Empleado"
        open={isEditModalVisible}
        onOk={handleEdit}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Input
          placeholder="Nuevo nombre"
          value={newName || currentEmployee?.employee?.name}
          onChange={(e) => setNewName(e.target.value)}
        />
      </Modal>
      <Modal
        title="Eliminar Empleado"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okType="danger"
        okText="Eliminar"
        cancelText="Cancelar"
        icon={<ExclamationCircleOutlined />}
      >
        <p>
          ¿Estás seguro que deseas eliminar a {currentEmployee?.employee?.name}?
        </p>
      </Modal>
    </div>
  );
};

export default Admin;
