const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Task = require('../../models/task');
const Kid = require('../../models/kid');
const Parent = require('../../models/Parent');

const router = express.Router();

router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Task title is required')
    ],
    validateRequest,
    async (req, res) => {
        const { title } = req.body;

        // Get the current user's information from the request
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // Check if the current user's role is kid
        if (currentUser.role !== 'kid') {
            return res.status(403).send({ error: 'User is not a kid' });
        }

        // Find the task by title and kid ID
        const task = await Task.findOne({ title, kid: currentUser.id });
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }

        // Check if the task is already completed
        if (task.completed) {
            return res.status(400).send({ error: 'Task is already completed' });
        }

        // Find the parent by ID
        const parent = await Parent.findById(task.parent);
        if (!parent) {
            return res.status(404).send({ error: 'Parent not found' });
        }

        // Check if the parent has sufficient balance
        if (parent.balance < task.amount) {
            return res.status(400).send({ error: 'Parent has insufficient balance' });
        }

        // Transfer the amount from parent to kid
        parent.balance -= task.amount;
        await parent.save();

        const kid = await Kid.findById(currentUser.id);
        kid.balance += task.amount;
        await kid.save();

        // Mark the task as completed
        task.completed = true;
        task.pending = false;
        await task.save();

        res.status(200).send({ message: 'Task completed successfully', task });
    }
);

module.exports = router;