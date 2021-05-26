const express = require("express")
const router = express.Router()
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
router.get("/", home)

//post routes
router.post("/create-post", createPost)
router.get("/posts", getPosts)

module.exports = router