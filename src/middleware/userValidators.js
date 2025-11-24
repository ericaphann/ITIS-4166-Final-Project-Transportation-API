import { handleValidationErrors } from "./handleValidationErrors.js";
import { body, oneOf } from "express-validator";

export const validateUser = [
    body('email')
        .exists({values: 'false'})
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email is not valid')
        .normalizeEmail(),

    body('password')
        .exists({values: 'false'})
        .withMessage('Password is required')
        .bail()
        .isLength({ min: 5, max: 64 })
        .withMessage('Passworrd must be at least 5 characters and at most 64 characters'),
    
    handleValidationErrors
];

export const validateUpdateUser = [
    oneOf(
        [
            body('email').exists({values: 'falsy'}),
            body('password').exists({values: 'falsy'})
        ],
        { message: 'At least one field (email, password) must be provided' },
    ),

    body('email')
        .optional()
        .trim()
        .escape()
        .isEmail()
        .withMessage('Email is not valid')
        .normalizeEmail(),

    body('password')
        .optional()
        .trim()
        .escape()
        .isString()
        .withMessage('Password must be a string')
        .bail()
        .isLength({ min: 5, max: 64 })
        .withMessage('Password must be at least 5 characters and at most 64 characters'),

    handleValidationErrors

];

export const validateUserRole = [
    body('role')
        .exists({ values: 'falsy' })
        .withMessage('Role is required')
        .bail()
        .isIn(['USER', 'CONDUCTOR', 'DRIVER', 'PILOT'])
        .withMessage('Role must be either USER, CONDUCTOR, DRIVER, or PILOT'),

    handleValidationErrors
];