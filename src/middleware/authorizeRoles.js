export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            const error = new Error('Forbidden: Insufficient Permission');
            error.status = 403;
            return next(error);
        }
        return next();
    };
}