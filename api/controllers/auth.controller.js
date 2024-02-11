import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        next(errorHandler(400, 'Required fields are missing!'))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)
    const user = new User({
        username, email, password: hashedPassword
    })

    try {
        await user.save();
        res.status(200).json('Sign up successful!')
    } catch (err) {
        next(err)
    }
}