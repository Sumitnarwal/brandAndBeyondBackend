


import env from "dotenv";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import UserModel from "../models/userModels.js";
env.config()

const newToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};


export const registerUser = async (req, res) => {
    try {
        console.log(req.body)
        let user = await UserModel.findOne({ email: req.body.email }).lean().exec();

        if (user)
            return res.status(400).send({ message: "Please try another email" });

        user = await UserModel.create(req.body);

        const token = newToken(user);

        res.send({ user, token });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

///login User

export const loginUser = async (req, res) => {
    try {
      
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(400)
                .send({ message: "Please try another email or password" });

        const match = user.checkPassword(req.body.password);

        if (!match)
            return res
                .status(400)
                .send({ message: "Please try another email or password" });

        const token = newToken(user);
        res.send({ user, token });
    } catch (err) {
        res.status(500).send(err.message);
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const user = await UserModel.find().lean().exec();
        return res.send(user);
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

