const authService = require('../services/authService');

class AuthController {
    async register(req, res) {
        try {
            const { username, password } = req.body;
            const user = await authService.register(username, password);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const { user, token } = await authService.login(username, password);
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
