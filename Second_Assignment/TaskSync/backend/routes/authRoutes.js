const authRoute = require("express").Router();
const {register,login,logout,getProfile} = require("../controllers/authController");
const {authMiddleware} = require("../middlewares/authMiddleware");
authRoute
.post("/register", register)
.post("/login", login)
.post("/logout", logout)
.get("/profile", authMiddleware, getProfile)
.patch('/forgot-password', forgotPassword)
.patch('/profile', authMiddleware, updateProfile)
module.exports = {authRoute};