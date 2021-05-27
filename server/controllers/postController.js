const { Post } = require("../db/models")
const crypto = require("crypto");
const jwt_decode = require("jwt-decode")

exports.createPost = async (req, res) => {
    // res.send("POST IS CREATED!")
    const id = crypto.randomBytes(16).toString("hex");
    const { title, description } = req.body
    const token = req.headers.authorization
    const UserId = jwt_decode(token, {payload: true})
    if (!id || ! req.body) {
        res.status(400).json({ message: "Некорректные данные" })
    }
    if (req.body === "") {
        res.status(400).json({ message: "Некорректные данные" })
    }
    const post = Post.build({
        id: id,
        userId: UserId.id,
        title: title,
        description: description,
    })
    await post.save()
    res.json(post)
}

exports.getPosts = async (req, res) => {
    const token = req.headers.authorization
    const UserId = jwt_decode(token, {payload: true})
    const posts = await Post.findAll({where: {userId: UserId.id}})
    if (!UserId.id) {
        await res.status(403).json({ message: "Not found" })
    }
    await res.json(posts)
}