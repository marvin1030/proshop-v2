import jwt from "jsonwebtoken";

const generateToken = (res, userID) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // set jwt to http only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,//20 days
        signed: process.env.NODE_ENV !== 'development',
    })
}

export default generateToken;