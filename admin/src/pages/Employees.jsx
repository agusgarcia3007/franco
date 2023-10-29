import { Table, Rate } from "antd";
import Layout from "../components/layouts/Layout";
import EmployeeManager from "../components/EmployeeManager";
import { useEmployees } from "../context/Employees";
import { Link } from "react-router-dom";

const Employees = () => {
  const { loading, employees } = useEmployees();

  const columns = [
    {
      title: "Nombre",
      dataIndex: ["employee", "name"],
      key: "name",
      width: 150,
    },
    {
      title: "ID",
      dataIndex: ["employee", "id"],
      key: "id",
      width: 50,
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Calificación Promedio",
      dataIndex: "avgRating",
      sorter: (a, b) => a.avgRating - b.avgRating,
      key: "avgRating",
      width: 200,
      render: (avgRating) => (
        <div
          style={{
            display: "flex",
            gap: "3px",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          <Rate allowHalf disabled value={avgRating} /> <span>{avgRating}</span>
        </div>
      ),
    },
    {
      title: "Cantidad de Votos",
      dataIndex: "voteCount",
      key: "voteCount",
      width: 50,
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Comentarios",
      key: "comments",
      width: 75,
      render: (record) =>
        record.comments.length > 0 ? (
          <Link to={`/reviews/${record.employee.id}`}>
            Ver {record.comments.length} comentarios
          </Link>
        ) : null,
    },
    {
      title: "Acciones",
      key: "action",
      width: 150,
      render: (record) => (
        <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
          <EmployeeManager employee={record.employee} actionType={"edit"} />
          <EmployeeManager employee={record.employee} actionType={"delete"} />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <Table
        dataSource={employees}
        columns={columns}
        loading={loading}
        rowKey={(record) => record.employee.id}
        scroll={{ x: "max-content" }}
      />
    </Layout>
  );
};

export default Employees;
