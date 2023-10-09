import Layout from "../components/layouts/Layout";
import { Table } from "antd";
import { dateParser } from "../utils/dateParser";
import { useEmployees } from "../context/Employees";

const Reviews = () => {
  const { employees, reviews, loading } = useEmployees();

  const findEmployeeNameById = (id) => {
    const employeeObj = employees.find((emp) => emp.employee.id === id);
    return employeeObj ? employeeObj.employee.name : "Employee not found";
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "employeeID",
      key: "name",
      render: (record) => findEmployeeNameById(record),
    },
    { title: "Comentario", dataIndex: "comment", key: "comment" },
    {
      title: "Fecha",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      render: (text) => dateParser(text),
    },
  ];

  return (
    <Layout>
      <Table dataSource={reviews} columns={columns} loading={loading} />
    </Layout>
  );
};

export default Reviews;
