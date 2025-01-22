const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const { handleErrors, currentUser } = require("./middleware");
const { NotFoundError } = require("./errors");

const { authRouter } = require("./router/User");
const { parentRouter } = require("./router/Parent");
const kidRouter = require("./router/Kid");





const app = express();
app.use(cors());

/**
 * Middleware
 */
app.use(express.json());
app.use(morgan("dev"));
app.use(currentUser);

/*
 * Routers
 */
app.use("/auth", authRouter);
app.use("/parent", parentRouter);
app.use("/kid", kidRouter);




/**
 * Not Found Catch all
 */
app.all("*", (req) => {
  throw NotFoundError(`${req.method} ${req.url}: Route not found`);
});

/**
 * Error Handling
 */
app.use(handleErrors);

module.exports = app;