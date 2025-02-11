import express from "express"
import { Login, SignUp, updteUser } from "../controllers/User.controller.js";
import { authMiddleware } from "../middleware/auth.tokenMiddleware.js";

const route = express.Router();


route.post("/resgister",SignUp)
route.post("/login",Login)
route.put("/update",authMiddleware,updteUser)

export default route