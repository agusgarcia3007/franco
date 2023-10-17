import { Button, Typography, Image } from "antd";
import logo from "../assets/logo.png";

const { Title, Paragraph } = Typography;

const Introduction = ({ setStep }) => {
  return (
    <div
      style={{
        padding: "20px 10px",
        textAlign: "center",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <Image
        alt="logo"
        src={logo}
        loading="lazy"
        width={130}
        height={130}
        preview={false}
        draggable={false}
      />
      <Title level={2} style={{ color: "#08c" }}>
        ¡Nos encanta escuchar tu opinión!
      </Title>
      <Paragraph style={{ fontSize: "16px" }}>
        Estamos emocionados de conocer tu experiencia con nosotros.
        <br />
        Al compartir tu opinión, no solo nos ayudas a mejorar, sino que también
        obtienes un <strong>30% de descuento</strong> en tu próxima compra.
        <br />Y hay más... si nos das{" "}
        <strong>5 estrellas en Google Maps</strong>, celebramos tu apoyo con una{" "}
        <br />
        <strong style={{ fontSize: "24px", fontWeight: "bold", color: "#08c" }}>
          MERIENDA GRATIS.
        </strong>
        <br /> ¡Disfruta de un delicioso{" "}
        <strong>Flat White y un Alfajor</strong> en tu próxima visita!
      </Paragraph>
      <Button
        type="primary"
        size="large"
        onClick={() => setStep(1)}
        style={{ marginTop: "20px" }}
      >
        Comenzar
      </Button>
    </div>
  );
};

export default Introduction;
