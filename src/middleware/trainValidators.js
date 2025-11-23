import { handleValidationErrors } from "./handleValidationErrors.js";
import { body, param } from "express-validator";

export const validateTrainId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Train ID must be a positive integer'),
    handleValidationErrors
];

export const validateTrain = [
    body('type')
        .exists({ values: 'falsy' })
        .withMessage('Type is required')
        .bail()
        .isString()
        .withMessage('Type must be a string')
        .isLength({ min: 1, max: 50 })
        .withMessage('Type must be between 1 and 50 characters'),

    body('origin')
        .exists({ values: 'falsy' })
        .withMessage('Origin is required')
        .bail()
        .isString()
        .withMessage('Origin must be a string')
        .isLength({ min: 1, max: 100 })
        .withMessage('Origin must be between 1 and 100 characters'),

    body('destination')
        .exists({ values: 'falsy' })
        .withMessage('Destination is required')
        .bail()
        .isString()
        .withMessage('Destination must be a string')
        .isLength({ min: 1, max: 100 })
        .withMessage('Destination must be between 1 and 100 characters'),

    body('passengers')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Passengers must be a positive integer'),

    body('operator_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Operator ID must be a positive integer'),

    handleValidationErrors
];

export const validateUpdateTrain = [
    body('type')
        .optional()
        .isString()
        .withMessage('Type must be a string')
        .isLength({ min: 1, max: 50 })
        .withMessage('Type must be between 1 and 50 characters'),

    body('origin')
        .optional()
        .isString()
        .withMessage('Origin must be a string')
        .isLength({ min: 1, max: 100 })
        .withMessage('Origin must be between 1 and 100 characters'),

    body('destination')
        .optional()
        .isString()
        .withMessage('Destination must be a string')
        .isLength({ min: 1, max: 100 })
        .withMessage('Destination must be between 1 and 100 characters'),

    body('passengers')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Passengers must be a positive integer'),

    body('operator_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Operator ID must be a positive integer'),

    handleValidationErrors
];