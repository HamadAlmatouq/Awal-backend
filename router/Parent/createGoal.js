const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Kid = require('../../models/kid');
const Goal = require('../../models/goal');

const router = express.Router();

router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than zero'),
        body('image').notEmpty().withMessage('Image is required'),
        body('endDate').isISO8601().withMessage('End date must be a valid date'),
        body('Kname').notEmpty().withMessage('Kid name is required')
    ],
    validateRequest,
    async (req, res) => {
        const { title, amount, image, endDate, Kname } = req.body;

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

        // Create a new goal
        const goal = new Goal({
            title,
            amount,
            image,
            endDate,
            status: 'pending',
            Kname,
            parent: currentUser.id,
            kid: kid._id
        });

        await goal.save();

        res.status(201).send(goal);
    }
);

module.exports = router;