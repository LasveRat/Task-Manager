import express from "express";
import { logoutUser, registerUser } from "../controllers/auth/userController.js";
import { loginUser } from "../controllers/auth/userController.js";


const router = express.Router();


router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.get("/logout" , logoutUser);
router.get("/profile" , protect , getUser);




export default router;

