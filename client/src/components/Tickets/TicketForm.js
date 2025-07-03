import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { TextField, Button, Container, Typography, Select, MenuItem, InputLabel } from "@mui/material";

export default function TicketForm() {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    category: "technical",
    severity: "medium"
  });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/tickets", ticket, { 
        headers: { "x-auth-token": localStorage.getItem("token") } 
      });
      navigate("/tickets");
    } catch (err) {
      alert("Failed to create ticket!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Create New Ticket</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={ticket.title}
          onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={ticket.description}
          onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
        />
        <InputLabel>Category</InputLabel>
        <Select
          fullWidth
          value={ticket.category}
          onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
        >
          <MenuItem value="technical">Technical</MenuItem>
          <MenuItem value="billing">Billing</MenuItem>
          <MenuItem value="general">Genera