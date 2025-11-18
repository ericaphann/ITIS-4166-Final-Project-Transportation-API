import prisma from '../config/db.js';

export async function uniqueEmail(req, res, next) {
    const email = req.body.email;
    if (!email) {
        return next();
    }
    const userEmail = await prisma.user.findUnique({
        where: { email }
    });
    if (userEmail) {
        const error = new Error('Email already in use');
        error.status = 409;
        return next(error);
    }
    return next();
}