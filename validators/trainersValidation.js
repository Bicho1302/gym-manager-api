const { body } = require('express-validator');

const trainerValidationRules = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required'),

  body('email')
    .isEmail()
    .withMessage('A valid email is required'),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required'),

  body('specialty')
    .trim()
    .notEmpty()
    .withMessage('Specialty is required'),

  body('yearsOfExperience')
    .isInt({ min: 0 })
    .withMessage('Years of experience must be a non-negative integer'),

  body('availability')
    .trim()
    .notEmpty()
    .withMessage('Availability is required')
];

module.exports = trainerValidationRules;