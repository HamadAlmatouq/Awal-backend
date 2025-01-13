const express = require("express");
const getTasksRouter = require("./getTasks");
const kidInformationRouter = require("./getInformation");

const router = express.Router();

router.use("/", getTasksRouter);
router.use("/", getInformationRouter); // Add this line

module.exports = router;