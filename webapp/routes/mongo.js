const express = require("express");
const router = express.Router();

// eslint-disable-next-line no-unused-vars
const assertPassword = (req) =>
  new Promise((resolve, reject) => {
    const auth = req.headers.authorization;
    if (auth === `Bearer ${process.env.HTTP_PASSWORD}`) {
      resolve();
    } else {
      reject("Wrong or missing password");
    }
  });

router.get("/all", async (req, res) => {
  res.status(501);
  res.send("Not implemented");
});

router.get("/", async (req, res) => {
  res.status(501);
  res.send("Not implemented");
});

module.exports = router;
