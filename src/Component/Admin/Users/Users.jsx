// src/pages/Users.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("All");

  const fetchUsers = () => {
    axios
      .get("http://localhost:1000/api/admin/users")
      .then((res) => {
        // setUsers([...(res.data.students || []), ...(res.data.vendors || [])]);
        setUsers([
        ...(res.data.students || []),
        ...(res.data.vendors || []),
        ...(res.data.insturctor || [])
      ]);
      })
      .catch((err) => console.error(err));
  };

  const deleteUser = (id, userType) => {
    axios
      .delete(`http://localhost:1000/api/admin/user/${id}?userType=${userType}`)
      .then(() => fetchUsers())
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const filteredUsers =
    roleFilter === "All"
      ? users
      : users.filter((user) => (user.userType || "Student") === roleFilter);

  return (
    <Box p={3}>
      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel>Filter by Role</InputLabel>
        <Select value={roleFilter} label="Filter by Role" onChange={handleFilterChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Vendor">Vendor</MenuItem>
          <MenuItem value="Instructor">Instructor</MenuItem>
        </Select>
      </FormControl>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name || "N/A"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.userType || "Student"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteUser(user._id, user.userType || "Student")}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Users;
