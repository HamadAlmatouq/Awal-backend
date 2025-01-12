const express = require("express");
const createKidRouter = require("./createKid");
const createTaskRouter = require("./createTask");
const parentRoutes = require("./getKid");

const router = express.Router();

router.use("/createKid", createKidRouter);
router.use("/createTask", createTaskRouter);
router.use("/", parentRoutes);

module.exports = router;