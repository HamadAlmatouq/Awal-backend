const express = require("express");
const getTasksRouter = require("./getTasks");

const router = express.Router();

router.use("/", getTasksRouter);

module.exports = router;