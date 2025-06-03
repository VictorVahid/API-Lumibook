const express = require("express");
const userCtrl = require("../controllers/UserController");
const authController = require("../controllers/authController");
const requireAuth = require("../../middlewares/requireAuth");
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
userRouter.get("/usuarios/perfil", requireAuth, userCtrl.getUser);
userRouter.patch("/usuarios/perfil", userCtrl.patchUser);
userRouter.get("/usuarios/:id/atividades", userCtrl.getUserActivities);

// Atividades do usuário
// userRouter.get("/usuarios/:id/atividades", userCtrl.getUserActivities); // Adicionar se necessário

module.exports = userRouter;
