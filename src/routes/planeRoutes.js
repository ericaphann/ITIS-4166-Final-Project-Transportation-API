import express from 'express';
import { getAllPlanesHandler, getPlaneByIdHandler, createPlaneHandler, updatePlaneHandler, deletePlaneHandler } from '../controllers/planeController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validatePlane, validateUpdatePlane } from '../middleware/planeValidators.js';

const router = express.Router();

router.get('/', authenticate, getAllPlanesHandler);
router.get('/:id', authenticate, getPlaneByIdHandler);

// requires PILOT authentication!
router.post('/', authenticate, authorizeRoles('PILOT'), validatePlane, createPlaneHandler);
router.put('/:id', authenticate, authorizeRoles('PILOT'), validateUpdatePlane, updatePlaneHandler);
router.delete('/:id', authenticate, authorizeRoles('PILOT'), deletePlaneHandler);

export default router;