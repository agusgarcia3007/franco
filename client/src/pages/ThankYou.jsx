import { Button, Typography, Row, Col, Image } from "antd";
import { CoffeeOutlined, SmileOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";

const { Title, Text } = Typography;

const ThankYou = () => {
  return (
    <Row justify="center" align="middle">
      <Image
        alt="logo"
        src={logo}
        loading="lazy"
        width={130}
        height={130}
        preview={false}
        draggable={false}
      />
      <Col xs={24} md={12} lg={8} className="content-container">
        <Title level={2}>
          <SmileOutlined /> ¡Gracias por tu opinión!
        </Title>
        <Text style={{ fontSize: "16px" }}>Nos ayuda a mejorar.</Text>

        <div className="reward-section">
          <Title level={3} className="reward-title">
            <CoffeeOutlined /> ¡Tu opinión tiene recompensa!
          </Title>
          <Text>
            Y no olvides, si nos regalas <Text strong>5 estrellas</Text> en{" "}
            <Text strong>Google Maps</Text> y nos lo muestras en caja, te
            regalamos una merienda especial que incluye un Flat White y un
            Alfajor de Maicena <br />
            <Text strong style={{ fontSize: "20px" }}>
              De Regalo!
            </Text>
            .
          </Text>
        </div>

        <Button
          type="primary"
          size="large"
          className="maps-button"
          href="https://maps.app.goo.gl/rKAHgQ8Rb8x8i1V56?g_st=ic"
          target="_blank"
          rel="noopener noreferrer"
        >
          Encuéntranos en Google Maps
        </Button>
      </Col>
    </Row>
  );
};

export default ThankYou;
