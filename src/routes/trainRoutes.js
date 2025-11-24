import express from 'express';
import { getAllTrainsHandler, getTrainByIdHandler, createTrainHandler, updateTrainHandler, deleteTrainHandler } from '../controllers/trainController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateTrain, validateUpdateTrain } from '../middleware/trainValidators.js';

const router = express.Router();

router.get('/', authenticate, getAllTrainsHandler);
router.get('/:id', authenticate, getTrainByIdHandler);

// requires CONDUCTOR authentication!
router.post('/', authenticate, authorizeRoles('CONDUCTOR'), validateTrain, createTrainHandler);
router.put('/:id', authenticate, authorizeRoles('CONDUCTOR'), validateUpdateTrain, updateTrainHandler);
router.delete('/:id', authenticate, authorizeRoles('CONDUCTOR'), deleteTrainHandler);

export default router;