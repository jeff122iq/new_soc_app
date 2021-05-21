const express = require("express")
const router = express.Router()
const { login, register, home } = require("./controllers/userController")
const bodyParser = require('body-parser')


router.post("/login", bodyParser.json(), login)
router.post("/register", bodyParser.json(), register)
router.get("/", home)

module.exports = router