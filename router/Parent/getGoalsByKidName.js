const express = require('express');
const { query } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Goal = require('../../models/goal');
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

        // // Check if the current user's role is parent
        // if (currentUser.role !== 'parent') {
        //     return res.status(403).send({ error: 'User is not a parent' });
        // }

        // Find the kid by the provided Kname
        const kid = await Kid.findOne({ Kname });
        if (!kid) {
            return res.status(404).send({ error: 'Kid not found' });
        }

        // Find goals associated with the kid
        const goals = await Goal.find({ kid: kid._id });

        res.status(200).send(goals);
    }
);

module.exports = router;