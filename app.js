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

app.post("/api/login", async (req, res) => {
  // Test user
  const user = {
    id: 1,
    username: "charles",
    email: "charles@gmail.com"
  };
  // can be done sync or async
  // user, payload

  try {
    const token = await jwt.sign({ user }, "secretKey");
    res.json({ token });
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("App started on port 5000");
});
