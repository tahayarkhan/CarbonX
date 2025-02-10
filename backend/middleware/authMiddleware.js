import jwt from 'jsonwebtoken';
import User from '../models/User.js';



export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // console.log('Authorization Header:', req.headers.authorization); // Log the header

            token = req.headers.authorization.split(' ')[1];
            // console.log('Token:', token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded); 

            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error('Token verification failed:', error.message); // Log the error
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        console.log('No token provided'); // Log missing token
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

