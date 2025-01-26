const express = require('express');
const childSigninRouter = require('./childSignin');
const getGoalsByChildRouter = require('./getGoalsByChild');
const getTasksByChildRouter = require('./getTasksByChild');
const getKidInfoRouter = require('./getKidInfo');
const convertBalanceToSavingsRouter = require('./convertBalanceToSavings');
const completeTaskRouter = require('./completeTask');
const getKidCompletedTaskRouter = require('./getKidCompletedTask');





const router = express.Router();

router.use('/signin', childSigninRouter);
router.use('/goals', getGoalsByChildRouter);
router.use('/tasks', getTasksByChildRouter);
router.use('/info', getKidInfoRouter);
router.use('/convertBalanceToSavings', convertBalanceToSavingsRouter);
router.use('/completeTask', completeTaskRouter);
router.use('/completedTasks', getKidCompletedTaskRouter);





module.exports = router;