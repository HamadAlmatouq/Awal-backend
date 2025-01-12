const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Parent = require('../../models/Parent');
const Kid = require('../../models/kid');

const router = express.Router();

router.post(
    '/createKid',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('birthday').notEmpty().withMessage('Birthday is required'),
        body('civilID').notEmpty().withMessage('Civil ID is required'),
        body('mobile').notEmpty().withMessage('Mobile number is required'),
        body('parentId').notEmpty().withMessage('Parent ID is required')
    ],
    validateRequest,
    async (req, res) => {
        const { name, email, birthday, civilID, mobile, parentId } = req.body;

        
        const parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).send({ error: 'Parent not found' });
        }

        
        const kid = new Kid({
            name,
            email,
            birthday,
            civilID,
            mobile,
            parent: parentId
        });

        await kid.save();

        res.status(201).send(kid);
    }
);

module.exports = router;