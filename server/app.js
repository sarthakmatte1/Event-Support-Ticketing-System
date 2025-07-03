const express = require("express");
const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/tickets");
const { auth } = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tickets", auth, ticketRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;