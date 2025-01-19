const express = require("express");
const getTasksRouter = require("./getTasks");

const router = express.Router();

router.use("/", getTasksRouter);
router.use('/getGoals', getGoalsRouter);


module.exports = router;