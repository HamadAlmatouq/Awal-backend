const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Goal = require('../../models/goal');
const Kid = require('../../models/kid');

const router = express.Router();

router.delete(
    '/',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('Kname').notEmpty().withMessage('Kid name is required')
    ],
    validateRequest,
    async (req, res) => {
        const { title, Kname } = req.body;

        // Get the current user's information from the request
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // Check if the current user's role is parent
        // if (currentUser.role !== 'parent') {
        //     return res.status(403).send({ error: 'User is not a parent' });
        // }

        // Check if kid exists
        const kid = await Kid.findOne({ Kname });
        if (!kid) {
            return res.status(404).send({ error: 'Kid not found' });
        }

        // Delete the goal
        const deletedGoal = await Goal.findOneAndDelete({ title, kid: kid._id });

        if (!deletedGoal) {
            return res.status(404).send({ error: 'Goal not found' });
        }

        res.status(200).send({ message: 'Goal deleted successfully' });
    }
);

module.exports = router;