const express = require('express');
const { body } = require('express-validator');
const { validateRequest, currentUser } = require('../../middleware');
const Parent = require('../../models/parent');
const Kid = require('../../models/kid');
const Account = require('../../models/account'); // Ensure Account model is imported

const router = express.Router();

router.post(
    '/',
    currentUser, // Add this middleware to get the current logged-in parent
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('birthday').notEmpty().withMessage('Birthday is required'),
        body('civilID').notEmpty().withMessage('Civil ID is required'),
        body('mobile').notEmpty().withMessage('Mobile number is required')
    ],
    validateRequest,
    async (req, res) => {
        const { name, birthday, civilID, mobile } = req.body;
        const userId = req.user.id; // Get the user ID from the current user

        // Find the parent using the user ID
        const parent = await Parent.findOne({ user: userId });
        if (!parent) {
            return res.status(404).send({ error: 'Parent not found' });
        }

        const kid = new Kid({
            name,
            birthday,
            civilID,
            mobile,
            parent: parent._id
        });

        await kid.save();

        const account = new Account({
            owner: kid._id,
            ownerModel: 'Kid',
            balance: 0,
            accountType: 'Regular'
        });

        await account.save();

        kid.account = account._id;
        await kid.save();

        res.status(201).send(kid);
    }
);

module.exports = router;