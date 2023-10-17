import { Typography, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EmployeeManager from "../EmployeeManager";
import { ArrowLeftOutlined, LogoutOutlined } from "@ant-design/icons";
import { notification } from "antd";
import Reset from "../Reset";
import { useEmployees } from "../../context/Employees";

const Layout = ({ children }) => {
  const { reviews } = useEmployees();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    notification.success({
      message: "Hasta la próxima",
    });
    navigate("/");
  };

  return (
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
            {reviews.length > 0 && (
              <Link to="/reviews">
                <Button type="link" disabled={!reviews.length > 0}>
                  Reviews
                </Button>
              </Link>
            )}
            <Reset />
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            />
          </>
        ) : (
          <Button shape="round" icon={<ArrowLeftOutlined />} type="primary">
            <Link to="/">Inicio</Link>
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Layout;
