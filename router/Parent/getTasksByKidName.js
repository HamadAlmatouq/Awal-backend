const express = require('express');
const { query } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Task = require('../../models/task');
const Kid = require('../../models/kid');

const router = express.Router();

router.get(
    '/',
    [
        query('Kname').notEmpty().withMessage('Kid name is required')
    ],
    validateRequest,
    async (req, res) => {
        const { Kname } = req.query;

        // Get the current user's information from the request
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // Find the kid by the provided Kname
        const kid = await Kid.findOne({ Kname });
        if (!kid) {
            return res.status(404).send({ error: 'Kid not found' });
        }

        // Find tasks associated with the kid
        const tasks = await Task.find({ kid: kid._id });

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