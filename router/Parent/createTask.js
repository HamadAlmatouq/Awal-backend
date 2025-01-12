const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Parent = require('../../models/Parent');
const Kid = require('../../models/kid');
const Task = require('../../models/Task');

const router = express.Router();

router.post(
    '/createTask',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than zero'),
        body('duration').isInt({ gt: 0 }).withMessage('Duration must be greater than zero'),
        body('parentId').notEmpty().withMessage('Parent ID is required'),
        body('kidId').notEmpty().withMessage('Kid ID is required')
    ],
    validateRequest,
    async (req, res) => {
        const { title, amount, duration, parentId, kidId } = req.body;

        // Check if parent exists
        const parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).send({ error: 'Parent not found' });
        }

        // Check if kid exists and belongs to the parent
        const kid = await Kid.findOne({ _id: kidId, parent: parentId });
        if (!kid) {
            return res.status(404).send({ error: 'Kid not found or does not belong to the parent' });
        }

        // Create a new task
        const task = new Task({
            title,
            amount,
            duration,
            parent: parentId,
            kid: kidId
        });

        await task.save();

        res.status(201).send(task);
    }
);

module.exports = router;