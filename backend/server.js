const express = require('express');
require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const path = require("path");


connectDB();

const app = express();

app.use(errorHandler);

app.use(express.json({limit: "2mb"}));
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));


// Serve static files from the "dist" directory inside the "frontend" folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle all other requests by serving the index.html for your frontend
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist"));
});

app.listen(port, () => console.log(`Server started on port ${port}`));