import { useState } from "react";
import useLoginTimestamp from "../../hooks/useLoginTimestamp";
import { notification, Modal, Input, Typography, Button } from "antd";
import { Link, useLocation, useNavigation } from "react-router-dom";
import EmployeeManager from "../EmployeeManager";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Layout = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [password, setPassword] = useState("");
  const [isTimestampValid, updateTimestamp] = useLoginTimestamp();
  const navigate = useNavigation();
  const { pathname } = useLocation();

  const handleOk = () => {
    updateTimestamp();
    if (password === "admin5840") {
      setIsModalVisible(false);
    } else {
      notification.error("Contraseña incorrecta. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      {isModalVisible && !isTimestampValid ? (
        <Modal
          title="Por favor, introduce la contraseña"
          open={isModalVisible}
          onOk={handleOk}
          style={{ padding: "10px" }}
          onCancel={() => navigate("/")}
        >
          <Input.Password
            placeholder="Contraseña"
            style={{ margin: "10px 10px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Modal>
      ) : (
        <div>
          <Typography.Title>Franco Specialty Coffee</Typography.Title>
          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            {pathname === "/" ? (
              <>
                <EmployeeManager actionType={"create"} />
                <Button type="link">
                  <Link to="/reviews">Reviews</Link>
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
