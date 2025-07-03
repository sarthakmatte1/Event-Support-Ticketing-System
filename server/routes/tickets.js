const express = require("express");
const { auth, adminAuth } = require("../middleware/auth");
const Ticket = require("../models/Ticket");
const router = express.Router();

// Create a ticket (User)
router.post("/", auth, async (req, res) => {
  const ticket = new Ticket({
    ...req.body,
    createdBy: req.user.id
  });
  await ticket.save();
  res.status(201).json(ticket);
});

// Get all tickets (Admin) or user's tickets (User)
router.get("/", auth, async (req, res) => {
  const tickets = req.user.role === "admin" 
    ? await Ticket.find().populate("createdBy", "username")
    : await Ticket.find({ createdBy: req.user.id });
  res.json(tickets);
});

// Update ticket status (Admin)
router.patch("/:id", auth, adminAuth, async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, updatedAt: Date.now() },
    { new: true }
  );
  res.json(ticket);
});

module.exports = router;