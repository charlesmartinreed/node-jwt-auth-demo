const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// not protected
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

// protected route - only allowed access if token matches wht is expected for the user
app.post("/api/post", verifyToken, async (req, res) => {
  try {
    const authData = await jwt.verify(req.token, "secretKey");
    // timestamp is iat, "issued at"
    res.json({
      message: "Post created...",
      authData
    });
  } catch (err) {
    res.sendStatus(403);
    console.log(err);
  }
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

/*
Format of Token
Authorization: Bearer <access_token>
*/

// token verification middleware
function verifyToken(req, res, next) {
  // calling next sends us to the the next middleware in the line

  // Get auth header value
  const bearerHeader = req.headers["authorization"];

  // check that the bearer is not undefined
  if (typeof bearerHeader !== "undefined") {
    // take the token out of the bearer by splitting at the space
    // second value in the array will be the token
    const bearerToken = bearerHeader.split(" ")[1];
    // set the Token
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(5000, () => {
  console.log("App started on port 5000");
});
