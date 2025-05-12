const express = require("express");
const userCtrl = require("../controllers/UserController");
const userRouter = express.Router();

userRouter.post("/usuarios", userCtrl.createUser);
userRouter.get("/usuarios/:id", userCtrl.getUser);
userRouter.patch("/usuarios/:id", userCtrl.patchUser);
userRouter.delete("/usuarios/:id", userCtrl.deleteUser);

module.exports = userRouter;
