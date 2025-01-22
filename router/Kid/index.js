const express = require('express');
const childSigninRouter = require('./childSignin');
const getGoalsByChildRouter = require('./getGoalsByChild');
const getTasksByChildRouter = require('./getTasksByChild');
const getKidInfoRouter = require('./getKidInfo');


const router = express.Router();

router.use('/signin', childSigninRouter);
router.use('/goals', getGoalsByChildRouter);
router.use('/tasks', getTasksByChildRouter);
router.use('/info', getKidInfoRouter);


module.exports = router;