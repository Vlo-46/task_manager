const bcrypt = require('bcryptjs');
const sequelize = require('../sequelizeConfig');
const User = require('../models/user');
const Task = require('../models/task');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        const password = await bcrypt.hash('password', 10);

        const users = await User.bulkCreate([
            { username: 'user1', password },
            { username: 'user2', password }
        ]);

        const tasks = await Task.bulkCreate([
            { title: 'Task 1', description: 'Description for Task 1', status: 'pending', userId: users[0].id },
            { title: 'Task 2', description: 'Description for Task 2', status: 'in-progress', userId: users[0].id },
            { title: 'Task 3', description: 'Description for Task 3', status: 'completed', userId: users[1].id },
            { title: 'Task 4', description: 'Description for Task 4', status: 'pending', userId: users[1].id }
        ]);

        console.log('Database seeded successfully.');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
