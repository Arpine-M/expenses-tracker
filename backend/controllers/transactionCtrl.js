const asyncHandler = require('express-async-handler');
const Category = require('../model/Category');
const Transaction = require('../model/Transaction');
const { $where } = require('../model/User');

const transactionController = {
    // add
    create: asyncHandler(async(req, res) => {
        const { type, category, amount, date, description} = req.body;
        if(!amount || !type || !date) {
            throw new Error("Type, amount and date fields are mandatory");
        }
        // create
        const transaction = await Transaction.create({
            type,
            category,
            amount,
            description,
            user: req.user,
        });
        res.status(201).json(transaction);
    }),

    // lists
    getFilteredTransactions: asyncHandler(async(req, res) => {
      const {startDate, endDate, type, category} = req.body;
      let filters = {user: req.user};
      if(startDate) {
        filters.date = {...filters.date, $gte: new Date(startDate)};
      }
      if(endDate) {
        filters.date = {...filters.date, $lte: new Date(endDate)};
      }
      if(type) {
        filters.type = type;
      }
      if(category) {
        if(category === "All") {

        }else if(category === "Uncategorized") {
            filters.category = "Uncategorized";

        } else {
            filters.category = category;
        }
       }
       
       const transactions= await Transaction.find(filters).sort({date: -1});
       res.json(transactions);
    }),

    // update
    update: asyncHandler(async(req, res) => {
        const transaction = await Transaction.findById(req.params.id);
        if(transaction && transaction.user.toString() === req.user.toString()) {
            (transaction.type = req.body.type || transaction.type),
            (transaction.category = req.body.category || transaction.category),
            (transaction.amount = req.body.amount || transaction.amount),
            (transaction.date = req.body.date || transaction.date),
            (transaction.description = req.body.description || transaction.description);

            const updatedTransaction = await transaction.save();
            res.json(updatedTransaction);

        }

    }),

    // delete
    delete: asyncHandler(async(req, res) => {
        const transaction = await Transaction.findById(req.params.id);
        if(transaction && transaction.user.toString() === req.user.toString()) {
            await Transaction.findByIdAndDelete(req.params.id);
            res.json({message: "Transaction deleted successfully"});
        }
    }),
       
}

module.exports = transactionController;