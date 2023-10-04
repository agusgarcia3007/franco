import { Button, Typography, Row, Col } from "antd";
import { CoffeeOutlined, SmileOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ThankYou = () => {
  return (
    <Row justify="center" align="middle" className="thank-you-container">
      <Col xs={24} md={12} lg={8} className="content-container">
        <Title level={2}>
          <SmileOutlined /> ¡Gracias por tu opinión!
        </Title>
        <Text>Nos ayuda a mejorar.</Text>

        <div className="reward-section">
          <Title level={4} className="reward-title">
            <CoffeeOutlined /> ¡Tu opinión tiene recompensa!
          </Title>
          <Text>
            Si calificas con <Text strong>5 estrellas</Text> y lo muestras en
            caja, te llevas un <Text strong>Flat White gratis</Text>.
          </Text>
        </div>

        <Button
          type="primary"
          size="large"
          className="maps-button"
          href="https://www.google.com/maps"
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
