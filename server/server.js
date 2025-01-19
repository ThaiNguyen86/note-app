const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db.config.js");
const cors = require("cors");
const userRoutes = require("./src/routes/user.route.js");
const noteRoutes = require("./src/routes/note.route.js")

const app = express();

dotenv.config();

// Kết nối MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
