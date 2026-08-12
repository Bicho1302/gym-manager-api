const { body } = require('express-validator');
const { ObjectId } = require('mongodb');

const sessionValidationRules = [
  body('memberId')
    .custom((value) => ObjectId.isValid(value))
    .withMessage('A valid member ID is required'),

  body('trainerId')
    .custom((value) => ObjectId.isValid(value))
    .withMessage('A valid trainer ID is required'),

  body('sessionDate')
    .isISO8601()
    .withMessage('Session date must be a valid date'),

  body('startTime')
    .trim()
    .notEmpty()
    .withMessage('Start time is required'),

  body('durationMinutes')
    .isInt({ min: 1 })
    .withMessage('Duration must be at least 1 minute'),

  body('workoutType')
    .trim()
    .notEmpty()
    .withMessage('Workout type is required'),

  body('notes')
    .optional()
    .isString()
    .withMessage('Notes must be text'),

  body('status')
    .isIn(['scheduled', 'completed', 'cancelled'])
    .withMessage('Status must be scheduled, completed, or cancelled')
];

module.exports = sessionValidationRules;