const { body } = require('express-validator');

const planValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Plan name is required'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),

  body('monthlyPrice')
    .isFloat({ min: 0 })
    .withMessage('Monthly price must be a positive number'),

  body('durationMonths')
    .isInt({ min: 1 })
    .withMessage('Duration must be at least 1 month'),

  body('accessLevel')
    .trim()
    .notEmpty()
    .withMessage('Access level is required'),

  body('isActive')
    .isBoolean()
    .withMessage('isActive must be true or false')
];

module.exports = planValidationRules;