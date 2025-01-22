const express = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const Kid = require('../../models/kid');
const { validateRequest } = require('../../middleware');

const router = express.Router();

router.post(
    '/',
    [
        body('civilID').notEmpty().withMessage('Civil ID is required')
    ],
    validateRequest,
    async (req, res) => {
        const { civilID } = req.body;

        // Find the kid by civil ID
        const kid = await Kid.findOne({ civilID });
        if (!kid) {
            return res.status(404).send({ error: 'Kid not found' });
        }

        // Generate a JWT token for the kid without expiration
        const token = jwt.sign(
            {
                id: kid._id,
                Kname: kid.Kname,
                role: 'kid'
            },
            process.env.JWT_SECRET
        );

        res.status(200).send({ token });
    }
);

module.exports = router;