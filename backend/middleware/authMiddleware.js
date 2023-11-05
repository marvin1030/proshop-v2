import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;
    // Read jwt from token (note 'jwt' is what we named it when we set the cookie in the res)
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userID).select('-password');
            next();
        } catch (error) {
            console.log(error)
            res.status(401);
            throw new Error('Not Authorized, token failed')
        }

    } else {
        res.status(401);
        throw new Error('Not Authorized, no token provided')
    }
});

// Admin middleware
const admin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not Authorized as Admin')
    }
});

export { protect, admin }