import express from "express"
import { Login, SignUp } from "../controllers/User.controller.js";

const route = express.Router();


route.post("/resgister",SignUp)
route.post("/login",Login)

export default route