const express = require("express");
const userCtrl = require("../controllers/UserController");
const authController = require("../controllers/authController");
const userRouter = express.Router();

userRouter.post("/usuarios/login", authController.login);
userRouter.post("/usuarios/register", userCtrl.createUser);
userRouter.post("/usuarios", userCtrl.createUser);
userRouter.get("/usuarios", userCtrl.listUsers);
userRouter.get("/usuarios/:id", userCtrl.getUser);
userRouter.patch("/usuarios/:id", userCtrl.patchUser);
userRouter.delete("/usuarios/:id", userCtrl.deleteUser);
userRouter.get("/usuarios/:id/avatar", userCtrl.getAvatar);
userRouter.get("/usuarios/:id/stats", userCtrl.getUserStats);

module.exports = userRouter;
