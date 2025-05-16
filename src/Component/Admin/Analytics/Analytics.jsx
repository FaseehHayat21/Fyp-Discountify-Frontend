import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Typography, Space, Divider, Table } from "antd";
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, 
  LineChart, Line, 
  XAxis, YAxis, 
  Tooltip, Legend, 
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import axios from "axios";
import {
  UserOutlined,
  ShopOutlined,
  TeamOutlined,
  MessageOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  AppstoreOutlined,
  StarOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import './Dashboard.css';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [data, setData] = useState({
    totals: {
      students: 0,
      vendors: 0,
      instructors: 0,
      feedback: 0
    },
    distributions: {
      studentsByLocation: [],
      vendorsByCategory: [],
      instructorsByDepartment: []
    },
    trends: {
      registrations: []
    },
    metadata: {
      lastUpdated: null,
      timeRange: {
        start: null,
        end: null
      }
    }
  });

  const [loading, setLoading] = useState(true);

  const COLORS = ["#1890ff", "#13c2c2", "#52c41a", "#faad14", "#f5222d", "#722ed1"];
  const BAR_COLORS = ["#597ef7", "#9254de", "#36cfc9", "#ffa940", "#ff7a45"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:1000/api/admin/analytics");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const departmentColumns = [
    {
      title: 'Department',
      dataIndex: '_id',
      key: 'department'
    },
    {
      title: 'Instructors',
      dataIndex: 'count',
      key: 'count'
    },
    {
      title: 'Avg Rating',
      dataIndex: 'avgRating',
      key: 'rating',
      render: value => value ? value.toFixed(1) : 'N/A'
    },
    {
      title: 'Avg Experience (yrs)',
      dataIndex: 'avgExperience',
      key: 'experience',
      render: value => value ? value.toFixed(1) : 'N/A'
    }
  ];

  return (
    <div className="dashboard-container">
      <Title level={2} className="dashboard-title">Platform Analytics Dashboard</Title>
      <Text type="secondary" className="dashboard-subtitle">
        Last updated: {data.metadata.lastUpdated ? new Date(data.metadata.lastUpdated).toLocaleString() : 'Loading...'}
      </Text>
      
      <Divider orientation="left" className="dashboard-divider">Key Metrics</Divider>
      
      <Row gutter={[16, 16]} className="metrics-row">
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card bordered={false} className="metric-card">
            <Statistic
              title="Total Students"
              value={data.totals.students}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card bordered={false} className="metric-card">
            <Statistic
              title="Total Vendors"
              value={data.totals.vendors}
              prefix={<ShopOutlined />}
              valueStyle={{ color: '#52c41a' }}
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card bordered={false} className="metric-card">
            <Statistic
              title="Total Instructors"
              value={data.totals.instructors}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#722ed1' }}
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card bordered={false} className="metric-card">
            <Statistic
              title="Feedback Received"
              value={data.totals.feedback}
              prefix={<MessageOutlined />}
              valueStyle={{ color: '#faad14' }}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      <Divider orientation="left" className="dashboard-divider">User Distribution</Divider>
      
      <Row gutter={[16, 16]} className="chart-row">
        {/* Students by Location */}
        <Col xs={24} md={12} lg={8}>
          <Card 
            title={
              <Space>
                <EnvironmentOutlined />
                <span>Students by Location</span>
              </Space>
            } 
            bordered={false}
            className="chart-card"
            loading={loading}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.distributions.studentsByLocation}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.distributions.studentsByLocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value} students`,
                    `Active: ${props.payload.active || 0}`,
                    "Count"
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Vendors by Category */}
        <Col xs={24} md={12} lg={8}>
          <Card 
            title={
              <Space>
                <AppstoreOutlined />
                <span>Vendors by Category</span>
              </Space>
            } 
            bordered={false}
            className="chart-card"
            loading={loading}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.distributions.vendorsByCategory} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="_id" type="category" width={80} />
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value} vendors`,
                    `Avg Rating: ${props.payload.avgRating?.toFixed(1) || 'N/A'}`,
                    "Count"
                  ]}
                />
                <Legend />
                <Bar dataKey="count" name="Vendors" fill="#52c41a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Instructors by Department */}
        <Col xs={24} md={24} lg={8}>
          <Card 
            title={
              <Space>
                <TeamOutlined />
                <span>Instructors by Department</span>
              </Space>
            } 
            bordered={false}
            className="chart-card"
            loading={loading}
          >
            <Table
              columns={departmentColumns}
              dataSource={data.distributions.instructorsByDepartment}
              rowKey="_id"
              pagination={false}
              size="small"
              scroll={{ y: 240 }}
            />
          </Card>
        </Col>
      </Row>

      {/* <Divider orientation="left" className="dashboard-divider">Registration Trends</Divider>
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            title={
              <Space>
                <CalendarOutlined />
                <span>Monthly Registration Trends</span>
                <Text type="secondary">
                  {data.metadata.timeRange.start && data.metadata.timeRange.end ? 
                    `${new Date(data.metadata.timeRange.start).toLocaleDateString()} - ${new Date(data.metadata.timeRange.end).toLocaleDateString()}` : 
                    'Loading date range...'}
                </Text>
              </Space>
            } 
            bordered={false}
            className="chart-card"
            loading={loading}
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data.trends.registrations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="students" 
                  name="Students" 
                  stroke="#1890ff" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="vendors" 
                  name="Vendors" 
                  stroke="#52c41a" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="instructors" 
                  name="Instructors" 
                  stroke="#722ed1" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row> */}
    </div>
  );
};

export default Dashboard;