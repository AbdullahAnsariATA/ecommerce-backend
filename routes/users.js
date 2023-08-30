const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const verifyToken = require('../middlewares/verifyToken');

// Get-Users (Endpoint: "http://localhost:5000/api/users" using "GET" (auth) Required).
router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ message: "Success", users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  };
});

// Get-User-Profile (Endpoint: "http://localhost:5000/api/users/profile" using "GET" (auth) Required).
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userProfile = await Users.findById(req.decoded._id).select("-password -tokens");
    res.status(200).json({ message: "Success", userProfile });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
});

// Register-User (Endpoint: "http://localhost:5000/api/users" using "POST" (no-auth) Required).
router.post('/', async (req, res) => {
  try {
    const user = new Users(req.body);
    await user.save();
    res.status(201).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Login-User (Endpoint: "http://localhost:5000/api/users/login" using "POST" (no-auth) Required).
router.post('/login', async (req, res) => {
  try {
    const data = req.body;
    // 1- Check if the user email exists.
    const userExist = await Users.findOne({ email: data.email });
    if (!userExist) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    // 2- Validate the password.
    const isPwdCorrect = userExist.comparePassword(data.password);
    if (!isPwdCorrect) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    // 3- User is authenticated generate token.
    const token = await userExist.generateToken();
    return res.status(200).json({ message: "Success", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});


// Update-User (Endpoint: "http://localhost:5000/api/users/:id" using "PUT" (auth) Required).
router.put('/:id', verifyToken, async (req, res) => {
  try {
    await Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
})

// Delete-User (Endpoint: "http://localhost:5000/api/users/:id" using "DELETE" (auth) Required).
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
})

module.exports = router;