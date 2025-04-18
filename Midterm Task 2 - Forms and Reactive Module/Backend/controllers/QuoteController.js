const Quote = require("../models/Quote");

exports.createQuote = async (req, res) => {
  try {
    const { author, quote, date, title } = req.body;
    if (!author || !quote || !date) {
      return res.status(400).json({ error: "Author, quote, and date are required." });
    }

    const newQuote = new Quote({ author, quote, date, title });
    await newQuote.save();

    res.status(201).json({ message: "Quote created successfully!", quote: newQuote });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get all quotes
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};