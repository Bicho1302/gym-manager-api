const express = require('express');
const router = express.Router();

const trainersController = require('../controllers/trainersController');
const trainerValidationRules = require('../validators/trainersValidation');
const validate = require('../middleware/validation');
const isAuthenticated = require('../middleware/authentication');

// GET all trainers
router.get('/',
  /* #swagger.tags = ['Trainers']
     #swagger.summary = 'Get all trainers'
     #swagger.responses[200] = {
       description: 'Trainers retrieved successfully'
     }
     #swagger.responses[500] = {
       description: 'Server error'
     }
  */
  trainersController.getAllTrainers
);

// GET trainer by ID
router.get('/:id',
  /* #swagger.tags = ['Trainers']
     #swagger.summary = 'Get a trainer by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Trainer ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[200] = {
       description: 'Trainer retrieved successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid trainer ID'
     }
     #swagger.responses[404] = {
       description: 'Trainer not found'
     }
     #swagger.responses[500] = {
       description: 'Server error'
     }
  */
  trainersController.getTrainerById
);

// CREATE trainer
router.post('/',
  /* #swagger.tags = ['Trainers']
     #swagger.summary = 'Create a new trainer'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Trainer information',
       required: true,
       schema: {
         firstName: 'Sarah',
         lastName: 'Johnson',
         email: 'sarah.johnson@example.com',
         phone: '801-555-2468',
         specialty: 'Strength Training',
         yearsOfExperience: 5,
         availability: 'Monday-Friday'
       }
     }
     #swagger.responses[201] = {
       description: 'Trainer created successfully'
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
  trainerValidationRules,
  validate,
  trainersController.createTrainer
);

// UPDATE trainer
router.put('/:id',
  /* #swagger.tags = ['Trainers']
     #swagger.summary = 'Update an existing trainer'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Trainer ID',
       required: true,
       type: 'string'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated trainer information',
       required: true,
       schema: {
         firstName: 'Sarah',
         lastName: 'Johnson',
         email: 'sarah.johnson@example.com',
         phone: '801-555-9999',
         specialty: 'Strength Training',
         yearsOfExperience: 6,
         availability: 'Monday-Saturday'
       }
     }
     #swagger.responses[204] = {
       description: 'Trainer updated successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid data or trainer ID'
     }
     #swagger.responses[401] = {
       description: 'Authentication required'
     }
     #swagger.responses[404] = {
       description: 'Trainer not found'
     }
     #swagger.responses[500] = {
       description: 'Server error'
     }
  */
  isAuthenticated,
  trainerValidationRules,
  validate,
  trainersController.updateTrainer
);

// DELETE trainer
router.delete('/:id',
  /* #swagger.tags = ['Trainers']
     #swagger.summary = 'Delete a trainer'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Trainer ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[204] = {
       description: 'Trainer deleted successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid trainer ID'
     }
     #swagger.responses[404] = {
       description: 'Trainer not found'
     }
     #swagger.responses[500] = {
       description: 'Server error'
     }
  */
  trainersController.deleteTrainer
);

module.exports = router;