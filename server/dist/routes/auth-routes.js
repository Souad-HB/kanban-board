import { Router } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    // destructure the req.body
    const { username, password } = req.body;
    // find the user that has the given username
    const user = await User.findOne({
        where: { username },
    });
    // check if that username exists
    if (!user) {
        return res.status(401).json({ message: "Authentication Failed" });
    }
    // if the user exists, let's check the given password is valid
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: "Authentication Failed" });
    }
    // execute this, once the user exists and the password is valid
    const secretKey = process.env.JWT_SECRET_KEY || "";
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    // return the token
    return res.json({ token });
};
const router = Router();
// POST /login - Login a user
router.post("/login", login);
export default router;
