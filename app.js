const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// not protected
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

// will be protected
app.post("/api/post", (req, res) => {
  res.json({
    message: "Post created..."
  });
});

app.listen(5000, () => {
  console.log("App started on port 5000");
});
