const express = require("express");
const createKidRouter = require("./createKid");
const createTaskRouter = require("./createTask");
const deleteTaskRouter = require('./deleteTask');
const createGoalRouter = require('./createGoal');
const deleteGoalRouter = require('./deleteGoal');
const transferRouter = require('./createTransfer');
const createAllowanceRouter = require('./createAllowance');
const stopAllowanceRouter = require('./stopAllowance');
const getKidsByParentRouter = require('./getKidsByParent');
const getGoalsByKidNameRouter = require('./getGoalsByKidName');
const getTasksByKidNameRouter = require('./getTasksByKidName');
const getParentInfoRouter = require("./getParentInfo");
const getPendingTasksRouter = require("./getPendingTasks");
const updateTaskCompletionRequestStatusRouter = require("./updateTaskCompletionRequestStatus");

const router = express.Router();

router.use("/createKid", createKidRouter);
router.use("/createTask", createTaskRouter);
router.use('/deleteTask', deleteTaskRouter);
router.use('/createGoal', createGoalRouter);
router.use('/getKidsByParent', getKidsByParentRouter);
router.use('/allowance', createAllowanceRouter);
router.use('/stopAllowance', stopAllowanceRouter);
router.use('/deleteGoal', deleteGoalRouter);
router.use('/transfer', transferRouter);
router.use('/getGoalsByKidName', getGoalsByKidNameRouter);
router.use('/getTasksByKidName', getTasksByKidNameRouter);
router.use("/info", getParentInfoRouter);
router.use("/getPendingTasks", getPendingTasksRouter);
router.use("/updateTaskCompletionRequestStatus", updateTaskCompletionRequestStatusRouter);

module.exports = router;