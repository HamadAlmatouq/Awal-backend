const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Kid = require('../../models/kid');
const Goal = require('../../models/goal');

const router = express.Router();

router.post(
    '/',
    [
        body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than zero')
    ],
    validateRequest,
    async (req, res) => {
        const { amount } = req.body;

        // Get the current user's information from the request
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // Check if the current user's role is kid
        // if (currentUser.role !== 'kid') {
        //     return res.status(403).send({ error: 'User is not a kid' });
        // }

        // Find the kid by the current user's ID
        const kid = await Kid.findById(currentUser.id);
        if (!kid) {
            return res.status(404).send({ error: 'Kid not found' });
        }

        // Check if the kid has sufficient balance
        if (kid.balance < amount) {
            return res.status(400).send({ error: 'Insufficient balance' });
        }

        // Convert balance to savings
        kid.balance -= amount;
        kid.savings += amount;

        await kid.save();

        // Check if any goals are met
        const goals = await Goal.find({ kid: kid._id, status: 'pending' });
        for (const goal of goals) {
            if (kid.savings >= goal.amount) {
                goal.status = 'completed';
                await goal.save();
            }
        }

        res.status(200).send({ message: 'Amount converted to savings successfully', kid });
    }
);

module.exports = router;