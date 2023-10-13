import { Typography, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import EmployeeManager from "../EmployeeManager";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Reset from "../Reset";

const Layout = ({ children }) => {
  const { pathname } = useLocation();

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
            <Link to="/reviews">
              <Button type="link">Reviews</Button>
            </Link>
            <Reset />
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
