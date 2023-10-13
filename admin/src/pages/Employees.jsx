import { Table, Rate } from "antd";
import Layout from "../components/layouts/Layout";
import EmployeeManager from "../components/EmployeeManager";
import { useEmployees } from "../context/Employees";

const Employees = () => {
  const { loading, employees } = useEmployees();
  const columns = [
    { title: "Nombre", dataIndex: ["employee", "name"], key: "name" },
    {
      title: "ID",
      dataIndex: ["employee", "id"],
      key: "id",
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Calificación Promedio",
      dataIndex: "avgRating",
      sorter: (a, b) => a.avgRating - b.avgRating,
      key: "avgRating",
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
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Acciones",
      key: "action",
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
        rowKey={"employee.id"}
      />
    </Layout>
  );
};

export default Employees;
