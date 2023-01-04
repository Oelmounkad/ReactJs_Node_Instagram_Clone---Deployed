const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");

//Connect DB
connectDB();

// CORS
app.use(
  cors({
    origin: "*",
  })
);

// PORT
const PORT = process.env.PORT || 5000;

//Init Middleware
app.use(express.json({ limit: "50mb", extended: true }));

// Users routes
app.use("/api/users", require("./routes/users"));

// Auth routes
app.use("/api/auth", require("./routes/auth"));

// Post routes
app.use("/api/posts", require("./routes/posts"));

// Comments routes
app.use("/api/comments", require("./routes/comments"));

// Notifications routes
app.use("/api/notifications", require("./routes/notifications"));

// App listening to the port
app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));
