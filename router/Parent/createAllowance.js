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
        body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than zero'),
        body('frequency').isIn(['daily', 'weekly', 'monthly']).withMessage('Frequency must be daily, weekly, or monthly')
    ],
    validateRequest,
    async (req, res) => {
        const { Kname, amount, frequency } = req.body;

        // Get the current user's information from the request
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // // Check if the current user's role is parent
        // if (currentUser.role !== 'parent') {
        //     return res.status(403).send({ error: 'User is not a parent' });
        // }

        // Check if kid exists
        const kid = await Kid.findOne({ Kname });
        if (!kid) {
            return res.status(404).send({ error: 'Kid not found' });
        }

        // Calculate the next payment date based on the frequency
        let nextPaymentDate = new Date();
        if (frequency === 'daily') {
            nextPaymentDate.setDate(nextPaymentDate.getDate() + 1);
        } else if (frequency === 'weekly') {
            nextPaymentDate.setDate(nextPaymentDate.getDate() + 7);
        } else if (frequency === 'monthly') {
            nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
        }

        // Create a new transfer record with allowance settings
        const transfer = new Transfer({
            fromParent: currentUser.id,
            toKid: kid._id,
            amount,
            frequency,
            nextPaymentDate
        });

        await transfer.save();

        res.status(201).send({ message: 'Allowance set successfully', transfer });
    }
);

module.exports = router;