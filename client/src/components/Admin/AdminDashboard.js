import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get("/api/tickets", { headers: { "x-auth-token": localStorage.getItem("token") } })
      .then(res => setTickets(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {tickets.map(ticket => (
        <div key={ticket._id}>
          <h3>{ticket.title}</h3>
          <p>{ticket.status}</p>
        </div>
      ))}
    </div>
  );
}