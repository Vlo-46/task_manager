const taskService = require('../services/taskService');

class TaskController {
    async createTask(req, res) {
        try {
            const {title, description, status} = req.body;
            const task = await taskService.createTask(req.user.id, title, description, status);
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async getTasks(req, res) {
        try {
            const tasks = await taskService.getTasks(req.user.id);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async updateTask(req, res) {
        try {
            const {taskId} = req.params;
            const updates = req.body;
            const task = await taskService.updateTask(taskId, updates);
            res.status(200).json(task);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async deleteTask(req, res) {
        try {
            const {taskId} = req.params;
            await taskService.deleteTask(taskId);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = new TaskController();
