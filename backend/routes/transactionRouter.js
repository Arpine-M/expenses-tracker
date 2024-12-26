const express = require("express");
const usersController = require("../controllers/usersCtrl");
const transactionRouter = express.Router();
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");
const transactionController = require("../controllers/transactionCtrl");

transactionRouter.post(
  "/api/v1/transactions/create",
  isAuthenticated,
  transactionController.create
);
transactionRouter.get(
  "/api/v1/transactions/lists",
  isAuthenticated,
  transactionController.getFilteredTransactions
);

transactionRouter.put(
    "/api/v1/transactions/update/:id",
    isAuthenticated,
    transactionController.update
);

transactionRouter.delete(
    "/api/v1/transactions/delete/:id",
    isAuthenticated,
    transactionController.delete
);
module.exports = transactionRouter;
