import Layout from "../components/layouts/Layout";
import { useState, useEffect } from "react";
import { notification, Table } from "antd";
import { dateParser } from "../utils/dateParser";
import api from "../api/employees";
import { useEmployees } from "../context/Employees";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { employees } = useEmployees();

  const getReviews = async () => {
    setLoading(true);
    try {
      const data = await api.getComments();
      setReviews(data);
    } catch (error) {
      notification.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

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
