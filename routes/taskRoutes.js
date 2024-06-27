const express = require('express');
const {validationResult} = require('express-validator');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkTaskOwnership = require('../middlewares/authorshipMiddleware');
const {validateTaskCreation, validateTaskUpdate, validateTaskId} = require('../validations/taskValidation');
const router = express.Router();

router.use(authMiddleware);

router.get('/', taskController.getTasks);

router.post('/', validateTaskCreation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, taskController.createTask);

router.put('/:taskId', validateTaskUpdate, checkTaskOwnership, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, taskController.updateTask);

router.delete('/:taskId', validateTaskId, checkTaskOwnership, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, taskController.deleteTask);

module.exports = router;
