import { Form, Input, Checkbox, notification, Button, Typography } from "antd";
import { useState } from "react";
import api from "../api/employees";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const { username, password, rememberMe } = user;

      if (!username || !password) {
        return notification.error({
          message: "Por favor, introduce los datos",
        });
      }

      const { accessToken, refreshToken } = await api.login({
        username,
        password,
        rememberMe,
      });

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
    } catch (error) {
      notification.error({
        message: error.response.data.error ?? error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        maxWidth: "300px",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <Typography.Title>Login</Typography.Title>
      <Form name="basic" onFinish={handleOk}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            name="username"
            onChange={handleChange}
            value={user.username}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            name="password"
            onChange={handleChange}
            value={user.password}
          />
        </Form.Item>

        <Form.Item name="rememberMe" valuePropName="checked">
          <Checkbox
            name="rememberMe"
            onChange={(e) => setUser({ ...user, rememberMe: e.target.checked })}
            value={user.rememberMe}
          >
            Remember me
          </Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button loading={loading} type="primary" onClick={handleOk}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
