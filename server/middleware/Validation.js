import jwt from 'jsonwebtoken';

// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
    // Access the token from the cookie
    let token = req.cookies.token || req.header("x-auth-token"); // This will automatically be parsed by cookie-parser
    console.log("🔐 Received token:", token);  // DEBUG
    if (!token) {
        console.warn("❌ No token received.");
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded user:", decoded.user); 
        req.user = decoded.user;  // Add decoded data to req.user
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Token verification failed:', err);
        // Check for token expiration
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token has expired, please log in again' });
        }
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default authenticateUser;
