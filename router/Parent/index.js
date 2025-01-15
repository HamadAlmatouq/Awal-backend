const express = require("express");
const createKidRouter = require("./createKid");
const createTaskRouter = require("./createTask");
const deleteTaskRouter = require('./deleteTask');


const router = express.Router();

router.use("/createKid", createKidRouter);
router.use("/createTask", createTaskRouter);
router.use('/deleteTask', deleteTaskRouter);



module.exports = { parentRouter: router };