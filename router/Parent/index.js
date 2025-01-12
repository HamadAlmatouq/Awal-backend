const express = require("express");
const createKidRouter = require("./createKid");
const createTaskRouter = require("./createTask");

const router = express.Router();

router.use("/createKid", createKidRouter);
router.use("/createTask", createTaskRouter);

module.exports = router;