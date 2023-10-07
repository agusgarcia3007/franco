import { Rate, Typography } from "antd";

const { Text } = Typography;

const Question = ({ handleChange, value, question, subtitle }) => {
  return (
    <>
      <Text>{question}</Text>
      {subtitle && (
        <Text
          type="secondary"
          style={{ display: "block", fontSize: 12, opacity: 0.8 }}
        >
          {subtitle}
        </Text>
      )}
      <Rate
        allowHalf
        value={value}
        onChange={handleChange}
        style={{ marginBottom: 16, marginTop: 8, display: "block" }}
      />
    </>
  );
};

export default Question;
