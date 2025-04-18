const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String, required: true },
  quote: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("Quote", QuoteSchema);