const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  severity: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  status: { type: String, enum: ["open", "in-progress", "resolved"], default: "open" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", TicketSchema);