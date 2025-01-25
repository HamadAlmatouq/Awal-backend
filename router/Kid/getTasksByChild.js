const express = require('express');
const { validateRequest } = require('../../middleware');
const Task = require('../../models/task');

const router = express.Router();

router.get(
    '/',
    validateRequest,
    async (req, res) => {
        // Get the current user's information from the request
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // Check if the current user's role is kid
        if (currentUser.role !== 'kid') {
            return res.status(403).send({ error: 'User is not a kid' });
        }

        // Find tasks associated with the kid
        const tasks = await Task.find({ kid: currentUser.id });

        // Calculate remaining duration for each task
        const tasksWithFormattedDuration = tasks.map(task => {
            const currentTime = new Date();
            const elapsedTime = (currentTime - task.startTime) / (1000 * 60 * 60); // Elapsed time in hours
            const remainingDuration = Math.max(task.duration - elapsedTime, 0);

            const hours = Math.floor(remainingDuration);
            const minutes = Math.floor((remainingDuration - hours) * 60);

            return {
                ...task.toObject(),
                remainingDuration: `${hours}h ${minutes}m`
            };
        });

        res.status(200).send(tasksWithFormattedDuration);
    }
);

module.exports = router;