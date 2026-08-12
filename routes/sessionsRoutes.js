const express = require('express');
const router = express.Router();

const sessionsController = require('../controllers/sessionsController');
const sessionValidationRules = require('../validators/sessionsValidation');
const validate = require('../middleware/validation');
const isAuthenticated = require('../middleware/authentication');

// GET all workout sessions
router.get('/',
  /* #swagger.tags = ['Workout Sessions']
     #swagger.summary = 'Get all workout sessions'
     #swagger.responses[200] = {
       description: 'Workout sessions retrieved successfully'
     }
     #swagger.responses[500] = {
       description: 'Server error'
     }
  */
  sessionsController.getAllSessions
);

// GET workout session by ID
router.get('/:id',
  /* #swagger.tags = ['Workout Sessions']
     #swagger.summary = 'Get a workout session by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Workout session ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[200] = {
       description: 'Workout session retrieved successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid session ID'
     }
     #swagger.responses[404] = {
       description: 'Workout session not found'
     }
     #swagger.responses[500] = {
       description: 'Server error'
     }
  */
  sessionsController.getSessionById
);

// CREATE workout session
router.post('/',
  /* #swagger.tags = ['Workout Sessions']
     #swagger.summary = 'Create a new workout session'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Workout session information',
       required: true,
       schema: {
         memberId: 'REPLACE_WITH_MEMBER_ID',
         trainerId: 'REPLACE_WITH_TRAINER_ID',
         sessionDate: '2026-08-12',
         startTime: '10:00',
         durationMinutes: 60,
         workoutType: 'Strength Training',
         notes: 'Focus on upper body',
         status: 'scheduled'
       }
     }
     #swagger.responses[201] = {
       description: 'Workout session created successfully'
     }
     #swagger.responses[400] = {
       description: 'Validation error'
     }
     #swagger.responses[401] = {
       description: 'Authentication required'
     }
     #swagger.responses[500] = {
       description: 'Server error'
     }
  */
  isAuthenticated,
  sessionValidationRules,
  validate,
  sessionsController.createSession
);

// UPDATE workout session
router.put('/:id',
  /* #swagger.tags = ['Workout Sessions']
     #swagger.summary = 'Update an existing workout session'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Workout session ID',
       required: true,
       type: 'string'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated workout session information',
       required: true,
       schema: {
         memberId: 'REPLACE_WITH_MEMBER_ID',
         trainerId: 'REPLACE_WITH_TRAINER_ID',
         sessionDate: '2026-08-12',
         startTime: '11:00',
         durationMinutes: 75,
         workoutType: 'Strength Training',
         notes: 'Updated workout plan',
         status: 'scheduled'
       }
     }
     #swagger.responses[204] = {
       description: 'Workout session updated successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid data or session ID'
     }
     #swagger.responses[401] = {
       description: 'Authentication required'
     }
     #swagger.responses[404] = {
       description: 'Workout session not found'
     }
     #swagger.responses[500] = {
       description: 'Server error'
     }
  */
  isAuthenticated,
  sessionValidationRules,
  validate,
  sessionsController.updateSession
);

// DELETE workout session
router.delete('/:id',
  /* #swagger.tags = ['Workout Sessions']
     #swagger.summary = 'Delete a workout session'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Workout session ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[204] = {
       description: 'Workout session deleted successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid session ID'
     }
     #swagger.responses[404] = {
       description: 'Workout session not found'
     }
     #swagger.responses[500] = {
       description: 'Server error'
     }
  */
  sessionsController.deleteSession
);

module.exports = router;