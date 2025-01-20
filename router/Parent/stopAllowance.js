const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Transfer = require('../../models/transfer');
const Kid = require('../../models/kid');

const router = express.Router();

router.post(
    '/',
    [
        body('Kname').notEmpty().withMessage('Kid name is required')
    ],
    validateRequest,
    async (req, res) => {
        const { Kname } = req.body;

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

        // Delete the transfer record with allowance settings
        const transfer = await Transfer.findOneAndDelete({
            fromParent: currentUser.id,
            toKid: kid._id,
            frequency: { $exists: true }
        });

        if (!transfer) {
            return res.status(404).send({ error: 'Allowance not found' });
        }

        res.status(200).send({ message: 'Allowance stopped successfully' });
    }
);

module.exports = router;