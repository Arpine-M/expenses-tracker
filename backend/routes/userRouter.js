const express = require("express");
const usersController = require("../controllers/usersCtrl");
const userRouter = express.Router();
const isAuthenticated = require("../middlewares/isAuth");


userRouter.post("/api/v1/users/register", usersController.register);
userRouter.post("/api/v1/users/login", usersController.login);
userRouter.get("/api/v1/users/profile", usersController.profile);
userRouter.get("/api/v1/users/profile", isAuthenticated, usersController.profile);
module.exports = userRouter;
