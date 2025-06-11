const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
  try {
    console.log("Incoming request body:", req.body); 

    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("User already exists:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ username, email, password });
    const savedUser = await user.save();
    console.log("User saved:", savedUser); 

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Register error:", err); 
    res.status(500).json({ error: "Error creating user" });
  }
});


const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });


  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ message: "Login successful", token });
});


module.exports = router;
