const express = require('express');
const Task = require('../../models/Task'); // Adjust the path as necessary

const router = express.Router();

router.delete('/', async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const deletedTask = await Task.findOneAndDelete({ title });

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;