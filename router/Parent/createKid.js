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

        const kid = new Kid({
            Kname,
            email,
            birthday,
            civilID,
            mobile
        });

        await kid.save();

        res.status(201).send(kid);
    }
);

module.exports = router;