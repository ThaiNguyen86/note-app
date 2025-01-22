const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db.config.js");
const cors = require("cors");
const userRoute = require("./src/routes/user.route.js");
const noteRoute = require("./src/routes/note.route.js");
const shareNoteRoute = require("./src/routes/shareNote.route.js")

const app = express();

dotenv.config();

// Kết nối MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/user', userRoute);
app.use('/api/notes', noteRoute);
app.use("/api/notes/share", shareNoteRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
