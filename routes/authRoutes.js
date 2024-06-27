const express = require('express');
const {validationResult} = require('express-validator');
const authController = require('../controllers/authController');
const {validateRegister, validateLogin} = require('../validations/authValidation');
const router = express.Router();

router.post('/register', validateRegister, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, authController.register);

router.post('/login', validateLogin, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, authController.login);

module.exports = router;
