import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
    console.log('Passing through the middleware');

    // Checking if token exists in a cookie called 'jwt'
    const token = req.cookies.jwt;

    // If the token cookie doesn't exist, responding with 401 Unauthorized
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verifying that the token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next(); // Allowing the request to proceed
        
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default checkToken;