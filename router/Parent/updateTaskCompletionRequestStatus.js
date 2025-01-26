const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../../middleware');
const TaskCompletionRequest = require('../../models/taskCompletionRequest');
const Task = require('../../models/task');
const Parent = require('../../models/Parent');
const Kid = require('../../models/kid');

const router = express.Router();

router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Task title is required'),
        body('status').isIn(['approved', 'rejected']).withMessage('Status must be either approved or rejected')
    ],
    validateRequest,
    async (req, res) => {
        const { title, status } = req.body;

        // Get the current user's information from the request
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // Check if the current user's role is parent
        if (currentUser.role !== 'parent') {
            return res.status(403).send({ error: 'User is not a parent' });
        }

        // Find the task by title and parent ID
        const task = await Task.findOne({ title, parent: currentUser.id });
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }

        // Find the task completion request by task ID and parent ID
        const taskCompletionRequest = await TaskCompletionRequest.findOne({ task: task._id, parent: currentUser.id });
        if (!taskCompletionRequest) {
            return res.status(404).send({ error: 'Task completion request not found' });
        }

        // Find the parent by ID
        const parent = await Parent.findOne({ user: currentUser.id });
        if (!parent) {
            return res.status(404).send({ error: 'Parent not found' });
        }

        // Find the kid by ID
        const kid = await Kid.findById(task.kid);
        if (!kid) {
            return res.status(404).send({ error: 'Kid not found' });
        }

        if (status === 'approved') {
            // Check if the parent has sufficient balance
            if (parent.balance < task.amount) {
                return res.status(400).send({ error: 'Insufficient balance' });
            }

            // Update parent's balance
            parent.balance -= task.amount;
            await parent.save();

            // Update kid's balance
            kid.balance += task.amount;
            await kid.save();
        }

        // Mark the task as not completed
        task.completed = false;
        task.pending = false;
        await task.save();

        // Update the task completion request status
        taskCompletionRequest.status = status;
        await taskCompletionRequest.save();

        res.status(200).send({ message: `Task completion request ${status} successfully`, taskCompletionRequest });
    }
);

module.exports = router;