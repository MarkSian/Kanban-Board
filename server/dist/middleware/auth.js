import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            res.status(403).send('Forbidden');
            return;
        }
        req.user = user;
        next();
    });
};
