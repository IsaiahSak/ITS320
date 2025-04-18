const express = require("express");
const mongoose = require("mongoose");
const quoteRoutes = require("./routes/QuoteRouter.js");
const todoRoutes = require("./routes/TodoRouter.js");
const cors = require('cors');

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api", quoteRoutes);
app.use("/api/todo", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
