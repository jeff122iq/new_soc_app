const express = require("express")
const router = express.Router()
const { login, register, home } = require("./controllers/userController")


router.post("/login", login)
router.post("/register", register)
router.get("/", home)

module.exports = router