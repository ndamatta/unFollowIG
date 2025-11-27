const express = require("express");
const path = require("path");
const documentationRoute = require("./routes/documentation");
const homeRoute = require("./routes/home");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

// Check env
if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");
} else {
  console.log("Running in development mode");
}

// Routes
app.use("/", homeRoute);
app.use("/documentation", documentationRoute);

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(process.cwd(), "/views/404.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
