const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Task = require('../../models/task');
const TaskCompletionRequest = require('../../models/taskCompletionRequest');
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

        // Create a task completion request
        const taskCompletionRequest = new TaskCompletionRequest({
            task: task._id,
            kid: currentUser.id,
            parent: task.parent
        });

        await taskCompletionRequest.save();

        res.status(201).send({ message: 'Task completion request submitted successfully', taskCompletionRequest });
    }
);

module.exports = router;