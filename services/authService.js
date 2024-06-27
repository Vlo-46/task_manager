const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class AuthService {
    async register(username, password) {
        const isExist = await User.findOne({where: {username}});

        if (isExist) {
            throw new Error('User exist');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password: hashedPassword});
        return user;
    }

    async login(username, password) {
        const user = await User.findOne({where: {username}});
        if (!user) {
            throw new Error('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '1h'});
        return {user, token};
    }
}

module.exports = new AuthService();
