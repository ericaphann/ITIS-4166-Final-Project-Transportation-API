import express from 'express';
import { getAllBusesHandler, getBusByIdHandler, createBusHandler, updateBusHandler, deleteBusHandler } from '../controllers/busController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateBus, validateUpdateBus } from '../middleware/busValidators.js';

const router = express.Router();

router.get('/', authenticate, getAllBusesHandler);
router.get('/:id', authenticate, getBusByIdHandler);

// requires DRIVER authentication!
router.post('/', authenticate, authorizeRoles('DRIVER'), validateBus, createBusHandler);
router.put('/:id', authenticate, authorizeRoles('DRIVER'), validateUpdateBus, updateBusHandler);
router.delete('/:id', authenticate, authorizeRoles('DRIVER'), deleteBusHandler);

export default router;