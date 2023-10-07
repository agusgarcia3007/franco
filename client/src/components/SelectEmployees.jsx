import { Select, Typography } from "antd";

const SelectEmployees = ({
  employees,
  setSelectedEmployee,
  selectedEmployee,
}) => {
  const { Text } = Typography;
  const { Option } = Select;
  return (
    <>
      <Text>Quien fue tu camarero el dia de hoy?</Text>
      <Select
        value={selectedEmployee}
        onChange={setSelectedEmployee}
        placeholder="Elige una persona"
        style={{ width: "100%", marginBottom: 16 }}
      >
        {employees.map((emp) => (
          <Option key={emp.employee.id} value={emp.employee.id}>
            {emp.employee.name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default SelectEmployees;
