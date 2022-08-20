import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import { registerUser, loginUser,getAllUsers } from "../src/controllers/AuthController.js";
import cors from "cors"

///////routers
const app = express();
app.use(express.json());
env.config()
app.use(cors())


app.post("/register", registerUser)
app.post("/login", loginUser)
app.get("/allusers",getAllUsers)




mongoose.connect(process.env.MONGO_DB).then(() =>
    app.listen(process.env.PORT || 1234, () =>

        console.log(`listening port ${process.env.PORT}`))).catch((err) => {
            console.log(err)
        })
