const express = require('express');
const { validateRequest } = require('../../middleware');
const Kid = require('../../models/kid');

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

        // Check if the current user's role is kid
        if (currentUser.role !== 'kid') {
            return res.status(403).send({ error: 'User is not a kid' });
        }

        // Find the kid by the current user's ID
        const kid = await Kid.findById(currentUser.id);
        if (!kid) {
            return res.status(404).send({ error: 'Kid not found' });
        }

        // Send the kid's information
        res.status(200).send({
            Kname: kid.Kname,
            email: kid.email,
            birthday: kid.birthday,
            civilID: kid.civilID,
            mobile: kid.mobile,
            savings: kid.savings,
            balance: kid.balance,
            Pname: kid.Pname,
            parent: kid.parent,
            steps: kid.steps, // Assuming steps is a field in the Kid model
            points: kid.points // Assuming points is a field in the Kid model
        });
    }
);

module.exports = router;