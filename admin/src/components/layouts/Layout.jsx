import { useState } from "react";
import useLoginTimestamp from "../../hooks/useLoginTimestamp";
import { notification, Modal, Input, Typography, Button, Form } from "antd";
import { Link, useLocation } from "react-router-dom";
import EmployeeManager from "../EmployeeManager";
import { ArrowLeftOutlined } from "@ant-design/icons";
import api from "../../api/employees";
import { useEmployees } from "../../context/Employees";

const Layout = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [password, setPassword] = useState("");
  const [isTimestampValid, updateTimestamp] = useLoginTimestamp();
  const { pathname } = useLocation();
  const { getEmployees } = useEmployees();

  const handleOk = () => {
    updateTimestamp();
    const encodedPassword = "YWd1c2dhcmNpYTMwMDc=";
    if (btoa(password) === encodedPassword) {
      setIsModalVisible(false);
    } else {
      notification.error({
        message: "Contraseña incorrecta. Inténtalo de nuevo.",
      });
    }
  };

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
    <div>
      {isModalVisible && !isTimestampValid ? (
        <Modal
          title="Por favor, introduce la contraseña"
          open={isModalVisible}
          onOk={handleOk}
          style={{ padding: "10px" }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <Form onFinish={handleOk}>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor, introduce tu contraseña",
                },
              ]}
            >
              <Input.Password
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onPressEnter={handleOk}
              />
            </Form.Item>
          </Form>
        </Modal>
      ) : (
        <div>
          <Typography.Title>Franco Specialty Coffee</Typography.Title>
          <div
            style={{
              display: "flex",
              gap: "3px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {pathname === "/" ? (
              <>
                <EmployeeManager actionType={"create"} />
                <Link to="/reviews">
                  <Button type="link">Reviews</Button>
                </Link>
                <Button danger type="default" onClick={handleReset}>
                  Reset Ratings
                </Button>
              </>
            ) : (
              <Button shape="round" icon={<ArrowLeftOutlined />} type="primary">
                <Link to="/">Inicio</Link>
              </Button>
            )}
          </div>
          {children}
        </div>
      )}
    </div>
  );
};

export default Layout;
