const cron = require('node-cron');
const Task = require('../models/task');

// Schedule a job to run every minute
cron.schedule('* * * * *', async () => {
    

    // Find all pending tasks
    const tasks = await Task.find({ pending: true, completed: false, expired: false });

    for (const task of tasks) {
        const currentTime = new Date();
        const elapsedTime = (currentTime - task.startTime) / (1000 * 60 * 60); // Elapsed time in hours

        // Update remaining duration
        task.remainingDuration = task.duration - elapsedTime;

        if (task.remainingDuration <= 0) {
            // Mark the task as expired
            task.expired = true;
            task.pending = false;
            task.remainingDuration = 0;
        }

        await task.save();
    }
});