const express = require("express");
const User = require("../models/user-model");
const { jwtAuthMiddleware, generateToken } = require("../jwt");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User(user);
    const response = await newUser.save();
    console.log("saved data");
    const payload = {
      id: express.response.id,
    };
    const token = generateToken(payload);

    console.log(JSON.stringify(payload));
    console.log("Token is generate:", token);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
