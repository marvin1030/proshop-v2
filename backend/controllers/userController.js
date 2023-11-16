import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";


// @desc Auth User and get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    generateToken(res, user._id);

    if (user && (await user.matchedPassword(password))) {
        res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

});

// @desc Register User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400);
        throw new Error('user already exist')
    }

    const user = await User.create({ name, email, password });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400);
        throw new Error('Unable to create user')
    }


});

// @desc Logout User and clear cookie
// @route /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged out sucessfully' })
});

// @desc Get User profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400);
        throw new Error('Unable to get profile')
    }

});

// @desc Update User
// @route  PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    console.log('params', req.params)
    console.log('body', req.body)
    const user = await User.findById({ _id: req.params.id });
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        user.save();
        res.status(200).json(user)
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});

// @desc Update User profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).send({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }

});

// @desc Get Users by ID
// @route  GET /api/users/:id
// @access Private/ADMIN
const getUserByID = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});

// @desc Get Users
// @route  GET /api/users/
// @access Private/ADMIN
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(404);
        throw new Error('Could not get users');
    }
});

// @desc Delete User
// @route  DELETE /api/users/:id
// @access Private/ADMIN
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error('You cannot delete an admin user')
        } else {
            user.deleteOne({ _id: user._id });
            res.status(200).json({ message: 'Deleted User' })
        }
    }
});



export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser
};