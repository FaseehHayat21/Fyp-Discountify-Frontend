// src/pages/Feedbacks.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = () => {
    axios.get("http://localhost:1000/api/admin/feedbacks").then((res) => setFeedbacks(res.data));
  };

  const deleteFeedback = (id) => {
    axios.delete(`http://localhost:1000/api/admin/feedbacks/${id}`).then(() => fetchFeedbacks());
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
  <Table>
  <TableHead>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Rating</TableCell>
      <TableCell>Comments</TableCell>
      <TableCell>Date</TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {feedbacks.map((fb) => (
      <TableRow key={fb._id}>
        <TableCell>{fb.name || 'N/A'}</TableCell>
        <TableCell>{fb.email || 'N/A'}</TableCell>
        <TableCell>{fb.rating}</TableCell>
        <TableCell>{fb.comments}</TableCell>
        <TableCell>{new Date(fb.date).toLocaleDateString()}</TableCell>
        <TableCell>
          <Button variant="contained" color="secondary" onClick={() => deleteFeedback(fb._id)}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

  );
};

export default Feedbacks;
