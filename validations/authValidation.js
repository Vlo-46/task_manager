const {body} = require('express-validator');

const validateRegister = [
    body('username').isString().isLength({min: 3}).withMessage('Username must be at least 3 characters long'),
    body('password').isString().isLength({min: 3}).withMessage('Password must be at least 6 characters long'),
    body().custom(value => {
        const keys = Object.keys(value);
        if (keys.length > 2 || keys.some(key => !['username', 'password'].includes(key))) {
            throw new Error('Invalid fields in request body');
        }
        return true;
    })
];

const validateLogin = [
    body('username').isString().withMessage('Username is required'),
    body('password').isString().withMessage('Password is required'),
    body().custom(value => {
        const keys = Object.keys(value);
        if (keys.length > 2 || keys.some(key => !['username', 'password'].includes(key))) {
            throw new Error('Invalid fields in request body');
        }
        return true;
    })
];

module.exports = {
    validateRegister,
    validateLogin
};
