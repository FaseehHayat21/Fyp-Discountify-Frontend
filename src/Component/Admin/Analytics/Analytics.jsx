// // src/pages/Analytics.jsx
// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import axios from "axios";

// const Analytics = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:1000/api/admin/users").then((res) => {
//       const students = res.data.students.length;
//       const vendors = res.data.vendors.length;
//       setData([
//         { name: "Students", value: students },
//         { name: "Vendors", value: vendors },
//       ]);
//     });
//   }, []);

//   const COLORS = ["#0088FE", "#FFBB28"];

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <PieChart>
//         <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
//           {data.map((entry, index) => (
//             <Cell key={index} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// export default Analytics;
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState({
    totalStudents: 0,
    totalVendors: 0,
    studentsByLocation: [],
    vendorsByCategory: [],
    feedbackCount: 0,
    registrationTrends: [],
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/admin/analytics");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Row gutter={[16, 16]}>
        {/* Summary Cards */}
        <Col span={6}>
          <Card title="Total Students" bordered={false} style={{ textAlign: "center" }}>
            <h2>{data.totalStudents}</h2>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Vendors" bordered={false} style={{ textAlign: "center" }}>
            <h2>{data.totalVendors}</h2>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Feedback Count" bordered={false} style={{ textAlign: "center" }}>
            <h2>{data.feedbackCount}</h2>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="New Registrations" bordered={false} style={{ textAlign: "center" }}>
            <h2>{data.registrationTrends.reduce((acc, val) => acc + val.count, 0)}</h2>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Students by Location */}
        <Col span={12}>
          <Card title="Students by Location">
            <PieChart width={400} height={300}>
              <Pie
                data={data.studentsByLocation}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.studentsByLocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </Col>

        {/* Vendors by Category */}
        <Col span={12}>
          <Card title="Vendors by Category">
            <BarChart width={400} height={300} data={data.vendorsByCategory}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Registration Trends */}
        <Col span={24}>
          <Card title="Registration Trends (Last 6 Months)">
            <LineChart width={1000} height={300} data={data.registrationTrends}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#8884d8" />
              <Line type="monotone" dataKey="vendors" stroke="#82ca9d" />
            </LineChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
