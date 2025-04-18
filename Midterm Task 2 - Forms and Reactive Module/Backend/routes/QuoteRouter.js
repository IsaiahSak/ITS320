const express = require("express");
const { createQuote, getQuotes } = require("../controllers/QuoteController.js");

const router = express.Router();

router.post("/quotes", createQuote);
router.get("/quotes", getQuotes);

module.exports = router;