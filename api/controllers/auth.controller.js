import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Required fields are missing!' })
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)
    const user = new User({
        username, email, password: hashedPassword
    })

    try {
        await user.save();
        res.status(200).json('Sign up successful!')
    } catch (err) {
        return res.status(500).json(err.message)
    }

}