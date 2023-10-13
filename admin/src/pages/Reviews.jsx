import { Table, Typography } from "antd";
import Layout from "../components/layouts/Layout";
import { dateParser } from "../utils/dateParser";
import { useEmployees } from "../context/Employees";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const UnifiedReviews = () => {
  const { employees, reviews, loading } = useEmployees();
  const { id } = useParams();

  const isSpecificEmployee = !!id;

  const currentEmployee = useMemo(() => {
    return isSpecificEmployee
      ? employees.find((emp) => emp.employee.id === parseInt(id)) || {}
      : null;
  }, [employees, id, isSpecificEmployee]);

  const EmployeeComments = useMemo(() => {
    return isSpecificEmployee ? currentEmployee?.comments || [] : reviews;
  }, [currentEmployee, isSpecificEmployee, reviews]);

  const findEmployeeNameById = (id) => {
    const employeeObj = employees.find((emp) => emp.employee.id === id);
    return employeeObj ? employeeObj.employee.name : "Employee not found";
  };

  const columns = isSpecificEmployee
    ? [
        { title: "Comentario", dataIndex: "comment", key: "comment" },
        {
          title: "Fecha",
          dataIndex: "created_at",
          key: "created_at",
          sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
          render: (text) => dateParser(text),
        },
      ]
    : [
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
      <Table
        title={() => (
          <Typography.Title level={3}>
            {isSpecificEmployee
              ? `Comentarios de ${currentEmployee?.employee?.name}`
              : "Todos los Comentarios"}
          </Typography.Title>
        )}
        columns={columns}
        dataSource={EmployeeComments}
        loading={loading}
        rowKey={(record) => record.id}
      />
    </Layout>
  );
};

export default UnifiedReviews;
