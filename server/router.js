const express = require("express")
const router = express.Router()
const { postMiddleware } = require("./middlewarse/postMiddleware")

const {
    login,
    register,
    home
} = require("./controllers/userController")
const {
    createPost,
    getPosts
} = require("./controllers/postController")

//user routes
router.post("/login", login)
router.post("/register", register)
router.get("/user/:id")
router.get("/", home)

//post routes
router.post("/create-post", [postMiddleware], createPost)
router.get("/posts", [postMiddleware], getPosts)

module.exports = router