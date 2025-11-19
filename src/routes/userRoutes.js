import express from 'express';
import { getAllUsersHandler, getCurrentUserHandler, updateCurrentUserHandler, deleteUserHandler, updateUserRoleHandler } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateUpdateUser, validateUserRole } from '../middleware/userValidators.js';
import { uniqueEmail } from '../middleware/uniqueEmail.js';

const router = express.Router();

router.get('/', authenticate, getAllUsersHandler);
router.get('/profile', authenticate, getCurrentUserHandler);
router.put('/profile', authenticate, validateUpdateUser, uniqueEmail, updateCurrentUserHandler);
router.patch('/:id/role', authenticate, authorizeRoles('CONDUCTOR', 'DRIVER', 'PILOT'), validateUserRole, updateUserRoleHandler);
router.delete('/profile', authenticate, deleteUserHandler);

export default router;