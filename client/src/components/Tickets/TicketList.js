import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Button, List, ListItem, Typography, Container } from "@mui/material";
import axios from "axios";

export default function TicketList() {
  const { user, logout } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    else {
      axios.get("/api/tickets", { headers: { "x-auth-token": localStorage.getItem("token") } })
        .then(res => setTickets(res.data))
        .catch(err => console.error(err));
    }
  }, [user, navigate]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>My Tickets</Typography>
      <Button variant="contained" onClick={() => navigate("/tickets/new")}>
        Create New Ticket
      </Button>
      <List>
        {tickets.map(ticket => (
          <ListItem key={ticket._id} button onClick={() => navigate(`/tickets/${ticket._id}`)}>
            <Typography>{ticket.title} - {ticket.status}</Typography>
          </ListItem>
        ))}
      </List>
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
}