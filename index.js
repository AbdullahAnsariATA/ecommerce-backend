require('dotenv').config();
const express = require("express");
const cors = require('cors');
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect To MongoDB.
db.connection.once("open", () => { console.log('✔✔ Connected to MongoDB ✔✔') }).on("error", (err) => { console.log('❌❌ Connection error ❌❌==>', err) });

// Main Routes.
app.use('/', require('./routes/index.js'));

// Starting Server.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});