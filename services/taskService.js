const Task = require('../models/task');

class TaskService {
    async createTask(userId, title, description, status) {
        const task = await Task.create({userId, title, description, status});
        return task;
    }

    async getTasks(userId) {
        const tasks = await Task.findAll({where: {userId}});
        return tasks;
    }

    async updateTask(taskId, updates) {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        await task.update(updates);
        return task;
    }

    async deleteTask(taskId) {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        await task.destroy();
    }
}

module.exports = new TaskService();
