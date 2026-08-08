const express = require('express');
const router = express.Router();

const membersController = require('../controllers/membersController');
const memberValidationRules = require('../validators/membersValidation');
const validate = require('../middleware/validation');

// GET all members
router.get('/', 
  /* #swagger.tags = ['Members']
     #swagger.summary = 'Get all gym members'
     #swagger.responses[200] = {
       description: 'Members retrieved successfully'
     }
     #swagger.responses[500] = {
       description: 'Server error'
     }
  */
  membersController.getAllMembers
);

// GET member by ID
router.get('/:id',
  /* #swagger.tags = ['Members']
     #swagger.summary = 'Get a member by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Member ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[200] = {
       description: 'Member retrieved successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid member ID'
     }
     #swagger.responses[404] = {
       description: 'Member not found'
     }
  */
  membersController.getMemberById
);

// CREATE member
router.post('/',
  /* #swagger.tags = ['Members']
     #swagger.summary = 'Create a new gym member'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Member information',
       required: true,
       schema: {
         firstName: 'John',
         lastName: 'Doe',
         email: 'john.doe@example.com',
         phone: '801-555-1234',
         dateOfBirth: '1995-06-15',
         membershipPlanId: null,
         joinDate: '2026-08-08',
         membershipStatus: 'active',
         emergencyContact: 'Jane Doe - 801-555-5678',
         assignedTrainerId: null
       }
     }
     #swagger.responses[201] = {
       description: 'Member created successfully'
     }
     #swagger.responses[400] = {
       description: 'Validation error'
     }
  */
  memberValidationRules,
  validate,
  membersController.createMember
);

// UPDATE member
router.put('/:id',
  /* #swagger.tags = ['Members']
     #swagger.summary = 'Update an existing gym member'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Member ID',
       required: true,
       type: 'string'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated member information',
       required: true,
       schema: {
         firstName: 'John',
         lastName: 'Doe',
         email: 'john.doe@example.com',
         phone: '801-555-9999',
         dateOfBirth: '1995-06-15',
         membershipPlanId: null,
         joinDate: '2026-08-08',
         membershipStatus: 'active',
         emergencyContact: 'Jane Doe - 801-555-5678',
         assignedTrainerId: null
       }
     }
     #swagger.responses[204] = {
       description: 'Member updated successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid data or member ID'
     }
     #swagger.responses[404] = {
       description: 'Member not found'
     }
  */
  memberValidationRules,
  validate,
  membersController.updateMember
);

// DELETE member
router.delete('/:id',
  /* #swagger.tags = ['Members']
     #swagger.summary = 'Delete a gym member'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Member ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[204] = {
       description: 'Member deleted successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid member ID'
     }
     #swagger.responses[404] = {
       description: 'Member not found'
     }
  */
  membersController.deleteMember
);

module.exports = router;