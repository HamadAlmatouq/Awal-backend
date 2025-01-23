const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Parent = require('../../models/Parent');
const Kid = require('../../models/kid');
const Transfer = require('../../models/transfer');

const router = express.Router();

router.post(
    '/',
    [
        body('Kname').notEmpty().withMessage('Kid name is required'),
        body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than zero')
    ],
    validateRequest,
    async (req, res) => {
        const { Kname, amount } = req.body;

        // Get the current user's information from the request
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // Check if the current user's role is parent
        if (currentUser.role !== 'parent') {
            return res.status(403).send({ error: 'User is not a parent' });
        }

        // Check if parent exists
        const parent = await Parent.findOne({ user: currentUser.id });
        if (!parent) {
            return res.status(404).send({ error: 'Parent not found' });
        }

        // Check if parent has sufficient balance
        if (parent.balance < amount) {
            return res.status(400).send({ error: 'Insufficient balance' });
        }

        // Check if kid exists
        const kid = await Kid.findOne({ Kname });
        if (!kid) {
            return res.status(404).send({ error: 'Kid not found' });
        }

        // Update parent's balance
        parent.balance -= amount;
        await parent.save();

        // Update kid's balance
        kid.balance += amount;
        await kid.save();

        // Create a new transfer record
        const transfer = new Transfer({
            fromParent: currentUser.id,
            toKid: kid._id,
            amount
        });

        await transfer.save();

        res.status(201).send({ message: 'Transfer successful', transfer });
    }
);

module.exports = router;