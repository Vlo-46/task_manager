const {body, param} = require('express-validator');

const validateTaskCreation = [
    body('title').isString().isLength({min: 1}).withMessage('Title is required'),
    body('description').isString().isLength({min: 1}).withMessage('Description is required'),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
    body().custom(value => {
        const keys = Object.keys(value);
        if (keys.some(key => !['title', 'description', 'status'].includes(key))) {
            throw new Error('Invalid fields in request body');
        }
        return true;
    })
];

const validateTaskUpdate = [
    param('taskId').isInt().withMessage('Task ID must be an integer'),
    body('title').optional().isString().isLength({min: 1}).withMessage('Title must be at least 1 character long'),
    body('description').optional().isString(),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
    body().custom(value => {
        const keys = Object.keys(value);
        if (keys.some(key => !['title', 'description', 'status'].includes(key))) {
            throw new Error('Invalid fields in request body');
        }
        return true;
    })
];

const validateTaskId = [
    param('taskId').isInt().withMessage('Task ID must be an integer')
];

module.exports = {
    validateTaskCreation,
    validateTaskUpdate,
    validateTaskId
};
