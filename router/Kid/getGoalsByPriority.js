const express = require('express');
const { validateRequest } = require('../../middleware');
const Goal = require('../../models/goal');

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

        // Find goals by kid ID and sort by creation date
        const goals = await Goal.find({ kid: currentUser.id }).sort({ createdAt: 1 });

        res.status(200).send(goals);
    }
);

module.exports = router;