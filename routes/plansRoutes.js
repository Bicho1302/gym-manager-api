const express = require('express');
const router = express.Router();

const plansController = require('../controllers/plansController');
const planValidationRules = require('../validators/plansValidation');
const validate = require('../middleware/validation');

// GET all membership plans
router.get('/',
  /* #swagger.tags = ['Membership Plans']
     #swagger.summary = 'Get all membership plans'
     #swagger.responses[200] = {
       description: 'Membership plans retrieved successfully'
     }
     #swagger.responses[500] = {
       description: 'Server error'
     }
  */
  plansController.getAllPlans
);

// GET membership plan by ID
router.get('/:id',
  /* #swagger.tags = ['Membership Plans']
     #swagger.summary = 'Get a membership plan by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Membership plan ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[200] = {
       description: 'Membership plan retrieved successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid plan ID'
     }
     #swagger.responses[404] = {
       description: 'Membership plan not found'
     }
  */
  plansController.getPlanById
);

// CREATE membership plan
router.post('/',
  /* #swagger.tags = ['Membership Plans']
     #swagger.summary = 'Create a new membership plan'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Membership plan information',
       required: true,
       schema: {
         name: 'Premium',
         description: 'Full access to gym facilities and classes',
         monthlyPrice: 49.99,
         durationMonths: 12,
         accessLevel: 'full',
         isActive: true
       }
     }
     #swagger.responses[201] = {
       description: 'Membership plan created successfully'
     }
     #swagger.responses[400] = {
       description: 'Validation error'
     }
  */
  planValidationRules,
  validate,
  plansController.createPlan
);

// UPDATE membership plan
router.put('/:id',
  /* #swagger.tags = ['Membership Plans']
     #swagger.summary = 'Update an existing membership plan'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Membership plan ID',
       required: true,
       type: 'string'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated membership plan information',
       required: true,
       schema: {
         name: 'Premium',
         description: 'Full access to gym facilities and premium classes',
         monthlyPrice: 54.99,
         durationMonths: 12,
         accessLevel: 'full',
         isActive: true
       }
     }
     #swagger.responses[204] = {
       description: 'Membership plan updated successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid data or plan ID'
     }
     #swagger.responses[404] = {
       description: 'Membership plan not found'
     }
  */
  planValidationRules,
  validate,
  plansController.updatePlan
);

// DELETE membership plan
router.delete('/:id',
  /* #swagger.tags = ['Membership Plans']
     #swagger.summary = 'Delete a membership plan'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Membership plan ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[204] = {
       description: 'Membership plan deleted successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid plan ID'
     }
     #swagger.responses[404] = {
       description: 'Membership plan not found'
     }
  */
  plansController.deletePlan
);

module.exports = router;