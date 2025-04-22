const authService = require('../services/auth.services');

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const { token, user } = await authService.login(email, password);
            res.status(200).json({ message: 'Login Successful', token, user });
        } catch (err) {
            if (err.name === 'ValidationError') {
                res.status(400).json({ message: err.message });
            } else if (err.name === 'AuthenticationError') {
                res.status(401).json({ message: err.message });
            } else {
                res.status(500).json(err);
            }
        }
    }
    
    async register(req, res) {
        const { name, email, password } = req.body;
        try {
            const {token, user} = await authService.register(name, email, password);
            res.status(201).json({ message: 'User Created', user, token });
        } catch (err) {
            if (err.name === 'ValidationError') {
                res.status(400).json({ message: err.message });
            } else if (err.name === 'DuplicateEmailError') {
                res.status(409).json({ message: err.message });
            } else {
                res.status(500).json(err);
            }
        }
    }
}

module.exports = new AuthController();