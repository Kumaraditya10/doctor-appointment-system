import express from "express";
import { bookAppointment, getProfile, loginUser, registerUser, updateProfile } from "../controllers/userCntroller.js";
import authUser from "../middlewares/authUser.js";
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile',authUser, getProfile)
userRouter.get('/update-profile',upload.single("image"),authUser,updateProfile)
userRouter.post('/book-appintment', authUser, bookAppointment)




export default userRouter