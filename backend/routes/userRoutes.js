import express from "express";
import { loginUser, registerUser, adminLogin, getProfile, updateProfile, getAllUsers, getUserDetails } from "../controllers/userController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();


userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.post('/admin', adminLogin)

userRouter.get('/profile', authUser, getProfile)

userRouter.put('/profile', authUser, updateProfile)

userRouter.get("/all-users", adminAuth, getAllUsers); 

userRouter.get("/details/:id", adminAuth, getUserDetails); 


export default userRouter;