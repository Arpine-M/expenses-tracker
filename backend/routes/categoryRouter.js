const express = require("express");
const usersController = require("../controllers/usersCtrl");
const categoryRouter = express.Router();
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");

categoryRouter.post("/api/v1/categories/create", isAuthenticated, categoryController.create);
categoryRouter.get("/api/v1/categories/lists", isAuthenticated, categoryController.lists);
module.exports = categoryRouter;
