import { rateLimit } from 'express-rate-limit';

export const logInLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: process.env.NODE_ENV === 'test' ? 1000 : 3,
    handler: (req, res, next) => {
        const error = new Error('Too many login requests. Try again later.');
        error.status = 429;
        next(error);
    }
});