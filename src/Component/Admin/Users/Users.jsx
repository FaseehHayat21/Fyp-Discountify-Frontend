// src/pages/Users.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get("http://localhost:1000/api/admin/users").then((res) => {
      setUsers([...res.data.students, ...res.data.vendors]);
    });
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

  return (
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
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user.name || "N/A"}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role || "Student"}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteUser(user._id, user.role || "Student")}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Users;
