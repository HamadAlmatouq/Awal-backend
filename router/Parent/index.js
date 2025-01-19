const express = require("express");
const createKidRouter = require("./createKid");
const createTaskRouter = require("./createTask");
const deleteTaskRouter = require('./deleteTask');
const createGoalRouter = require('./createGoal');
const getKidsByParentRouter = require('./getKidsByParent');




const router = express.Router();

router.use("/createKid", createKidRouter);
router.use("/createTask", createTaskRouter);
router.use('/deleteTask', deleteTaskRouter);
router.use('/createGoal', createGoalRouter);
router.use('/getKidsByParent', getKidsByParentRouter);





module.exports = { parentRouter: router };