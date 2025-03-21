const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


// Import Users Routes
const usersRoutes = require("./routes/users.routes")
app.use("/api", usersRoutes)

// Import Chats Routes
const chatsRoutes = require("./routes/chats.routes")
app.use("/api", chatsRoutes)

// Import Messages Routes
const messagesRoutes = require("./routes/messages.routes")
app.use("/api", messagesRoutes)

// Test Route
app.get("/", (req, res) => res.send("Chat API Running..."));

connectDB()
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
