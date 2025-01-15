const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Parent = require('../../models/Parent');
const Kid = require('../../models/kid');
const Task = require('../../models/Task');

const router = express.Router();

router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than zero'),
        body('duration').isInt({ gt: 0 }).withMessage('Duration must be greater than zero'),
        body('Kname').notEmpty().withMessage('Kid name is required')
    ],
    validateRequest,
    async (req, res) => {
        const { title, amount, duration, Kname } = req.body;

        // Get the current user's information from the request
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // Check if the current user's role is parent
        if (currentUser.role !== 'parent') {
            return res.status(403).send({ error: 'User is not a parent' });
        }

        // Check if kid exists
        const kid = await Kid.findOne({ Kname });
        if (!kid) {
            return res.status(404).send({ error: 'Kid not found' });
        }

        // Create a new task
        const task = new Task({
            title,
            amount,
            duration,
            parent: currentUser.id,
            kid: kid._id
        });

        await task.save();

        res.status(201).send(task);
    }
);

module.exports = router;