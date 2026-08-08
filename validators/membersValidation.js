const { body } = require('express-validator');

const memberValidationRules = [
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
    .notEmpty()
    .withMessage('Phone is required'),

  body('dateOfBirth')
    .isISO8601()
    .withMessage('Date of birth must be a valid date'),

  body('joinDate')
    .isISO8601()
    .withMessage('Join date must be a valid date'),

  body('membershipStatus')
    .isIn(['active', 'inactive', 'expired'])
    .withMessage('Membership status must be active, inactive, or expired'),

  body('emergencyContact')
    .notEmpty()
    .withMessage('Emergency contact is required')
];

module.exports = memberValidationRules;