const express = require('express');
const { validateRequest } = require('../../middleware');
const Parent = require('../../models/Parent');

const router = express.Router();

router.get(
    '/',
    validateRequest,
    async (req, res) => {
        // Get the current user's information from the request
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // Check if the current user's role is parent
        if (currentUser.role !== 'parent') {
            return res.status(403).send({ error: 'User is not a parent' });
        }

        // Find the parent by the current user's ID
        const parent = await Parent.findOne({ user: currentUser.id });
        if (!parent) {
            return res.status(404).send({ error: 'Parent not found' });
        }

        res.status(200).send(parent);
    }
);

module.exports = router;