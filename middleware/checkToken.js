import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
    console.log('Passing through the middleware');

    // Checking if token header exists (x-auth-token)
    const token = req.header('x-auth-token');

    // If the token header doesn't exist, responding with 401 Unauthorized
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verifying that the token is valid
        const decoded = jwt.verify(token, 'assigment2Phase2');
        req.user = decoded.user;
        next(); // Allowing the request to proceed
        
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default checkToken;