import { handleValidationErrors } from "./handleValidationErrors.js";
import { body } from "express-validator";

export const validateBus = [
    body('type')
        .exists({ values: 'falsy' })
        .withMessage('Type is required')
        .bail()
        .isString()
        .withMessage('Type must be a string')
        .isLength({ min: 1, max: 50 })
        .withMessage('Type must be between 1 and 50 characters'),

    body('route_num')
        .exists({ values: 'falsy' })
        .withMessage('Route number is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('Route number must be a positive integer'),

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

export const validateUpdateBus = [
    body('type')
        .optional()
        .isString()
        .withMessage('Type must be a string')
        .isLength({ min: 1, max: 50 })
        .withMessage('Type must be between 1 and 50 characters'),

    body('route_num')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Route number must be a positive integer'),

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