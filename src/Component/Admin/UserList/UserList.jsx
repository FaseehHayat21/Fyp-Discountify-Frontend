// src/components/UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList({ authToken }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/auth/users", {
          headers: { "auth-token": authToken },
        });
        setUsers([...res.data.students, ...res.data.vendors]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [authToken]);

  const deleteUser = async (id, userType) => {
    try {
      await axios.delete(`http://localhost:5000/admin/auth/user/${id}`, {
        headers: { "auth-token": authToken },
        data: { userType },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user._id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => deleteUser(user._id, user.role)}>Delete</button>
          {/* Add edit button to navigate to edit form */}
        </div>
      ))}
    </div>
  );
}

export default UserList;
