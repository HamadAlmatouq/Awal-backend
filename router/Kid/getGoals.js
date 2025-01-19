const express = require('express');
const Goal = require('../../models/goal');
const Kid = require('../../models/kid');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Get the current user's information from the request
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // Check if the current user's role is kid
        if (currentUser.role !== 'kid') {
            return res.status(403).send({ error: 'User is not a kid' });
        }

        // Find the kid by the current user's ID
        const kid = await Kid.findOne({ user: currentUser.id });
        if (!kid) {
            return res.status(404).send({ error: 'Kid not found' });
        }

        // Find goals associated with the kid
        const goals = await Goal.find({ kid: kid._id });

        res.status(200).send(goals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;