const express = require('express');
const Kid = require('../../models/kid');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Get the current user's information from the request
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // Check if the current user's role is parent
        // if (currentUser.role !== 'parent') {
        //     return res.status(403).send({ error: 'User is not a parent' });
        // }

        // Find kids associated with the parent
        const kids = await Kid.find({ parent: currentUser.id });

        res.status(200).send(kids);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;