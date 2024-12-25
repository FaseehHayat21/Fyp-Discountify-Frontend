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
          <TableCell>Feedback</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {feedbacks.map((fb) => (
          <TableRow key={fb._id}>
            <TableCell>{fb.content}</TableCell>
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
