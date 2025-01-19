const express = require('express');
const Kid = require('../../models/kid');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).send({ error: 'Not authenticated' });
        }

        // if (currentUser.role !== 'parent') {
        //     return res.status(403).send({ error: 'User is not a parent' });
        // }

        const kids = await Kid.find({ parent: currentUser.id });

        res.status(200).send(kids);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;