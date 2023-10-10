import { useState } from "react";
import useLoginTimestamp from "../../hooks/useLoginTimestamp";
import {
  notification,
  Modal,
  Input,
  Typography,
  Button,
  Form,
  Checkbox,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import EmployeeManager from "../EmployeeManager";
import { ArrowLeftOutlined } from "@ant-design/icons";
import api from "../../api/employees";
import { useEmployees } from "../../context/Employees";

const Layout = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [user, setUser] = useState({
    usname: "",
    password: "",
    rememberMe: false,
  });
  const [isTimestampValid, updateTimestamp] = useLoginTimestamp();
  const { pathname } = useLocation();
  const { getEmployees } = useEmployees();

  console.log(user);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOk = async () => {
    updateTimestamp();
    const { username, password, rememberMe } = user;

    if (!username || !password) {
      return notification.error({ message: "Por favor, introduce los datos" });
    }

    const { token, refreshToken } = await api.login({
      username,
      password,
      rememberMe,
    });

    setIsModalVisible(false);
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
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
              name="username"
              rules={[
                {
                  required: true,
                  message: "Por favor, introduce el usuario",
                },
              ]}
            >
              <Input
                placeholder="usuario"
                value={user.name}
                name="username"
                onChange={handleChange}
                onPressEnter={handleOk}
              />
            </Form.Item>
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
                value={user.password}
                name="password"
                onChange={handleChange}
                onPressEnter={handleOk}
              />
            </Form.Item>
            <Form.Item>
              <Checkbox
                onChange={(e) =>
                  setUser({ ...user, rememberMe: e.target.checked })
                }
                checked={user.rememberMe}
                name="rememberMe"
              >
                Remember Me
              </Checkbox>
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
