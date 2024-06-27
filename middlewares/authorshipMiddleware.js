const Task = require('../models/task');

const checkTaskOwnership = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (task.userId !== req.user.id) {
            return res.status(403).json({ error: 'You do not have permission to access this task' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = checkTaskOwnership;
