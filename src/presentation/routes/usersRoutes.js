const express = require("express");
const UserController = require("../controllers/UserController");
const requireAuth = require("../../middlewares/requireAuth");
const router = express.Router();

// Register
router.post("/users/register", UserController.createUser);
// Login
router.post("/users/login", UserController.login);
// List all users
router.get("/users", UserController.listUsers);
// Get user profile (protegido)
router.get("/users/profile", requireAuth, UserController.getUser);
// Get user by ID
router.get("/users/:id", UserController.getUser);
// Get user avatar
router.get("/users/:id/avatar", UserController.getAvatar);
// Get user activities
router.get("/users/:id/activities", UserController.getUserActivities);
// Update user stats
router.put("/users/:userId/stats/:statKey", UserController.getUserStats);

module.exports = router; 