const express = require("express");
const addLoanRouter = require("./addLoan");
const repayLoanRouter = require("./repayLoan");
const getLoanDetailsRouter = require("./getLoanDetails");
const getTransactionHistoryRouter = require("./getTransactionHistory");
const getDebtsRouter = require("./getDebts");

const router = express.Router();

router.use("/add-loan", addLoanRouter);
router.use("/repay-loan", repayLoanRouter);
router.use("/loan-details", getLoanDetailsRouter);
router.use("/transactions", getTransactionHistoryRouter);
router.use("/debts", getDebtsRouter);


module.exports = router;