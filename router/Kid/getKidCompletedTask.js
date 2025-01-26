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

        // Find completed tasks associated with the kid
        const tasks = await Task.find({ kid: currentUser.id, completed: true });

        res.status(200).send(tasks);
    }
);

module.exports = router;