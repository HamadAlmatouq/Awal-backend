const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Kid = require('../../models/kid');

const router = express.Router();

router.post(
    '/',
    [
        body('Kname').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('birthday').notEmpty().withMessage('Birthday is required'),
        body('civilID').notEmpty().withMessage('Civil ID is required'),
        body('mobile').notEmpty().withMessage('Mobile number is required')
    ],
    validateRequest,
    async (req, res) => {
        const { Kname, email, birthday, civilID, mobile } = req.body;

        // Get the current user's information from the request
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // Check if the current user's role is parent
        // if (currentUser.role !== 'parent') {
        //     return res.status(403).send({ error: 'User is not a parent' });
        // }

        const kid = new Kid({
            Kname,
            email,
            birthday,
            civilID,
            mobile,
            Pname: currentUser.name, // Assuming the parent's name is stored in the 'name' field
            parent: currentUser.id // Associate the kid with the parent
        });

        await kid.save();

        res.status(201).send(kid);
    }
);

module.exports = router;