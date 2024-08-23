import express from 'express';
import { logInUser, logOutUser, signUpUser } from '../controllers/authController.js';

const router = express.Router()

router.get("/sign",signUpUser )

router.get("/login", logInUser)

  router.get("/logout", logOutUser)

  

export default router