const express = require('express');
const { param } = require('express-validator');
const { validateRequest } = require('../../middleware');
const Kid = require('../../models/kid');
const Task = require('../../models/Task');

const router = express.Router();

router.get(
    '/:kidId/tasks',
    [
        param('kidId').notEmpty().withMessage('Kid ID is required')
    ],
    validateRequest,
    async (req, res) => {
        const { kidId } = req.params;

        const kid = await Kid.findById(kidId);
        if (!kid) {
            return res.status(404).send({ error: 'Kid not found' });
        }

        const tasks = await Task.find({ kid: kidId });

        res.status(200).send(tasks);
    }
);

module.exports = router;