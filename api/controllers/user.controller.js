import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import User from "../models/user.model.js"

export const test = (req, res) => {
    res.json({ message: 'API is working' })
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'Not Authorized'))
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password length must be greater than 6 charachters'))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username length must be greater than 7 and less than 20 charachters'))
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Can not contain space in username'))
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be in lowercase'))
        }
        if (!req.body.username.match(/^[a-zA-z0-9]+$/)) {
            return next(errorHandler(400, 'Username can contain letters and numbers'))
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password
            }
        }, { new: true });
        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not authorized to delete the user'))
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User has been deleted')
    } catch (err) {
        next(err)
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User has been signed out')
    } catch (err) {
        next(err)
    }
}