const { Post } = require("../db/models")
const crypto = require("crypto");

exports.createPost = async (req, res) => {
    // res.send("POST IS CREATED!")
    const id = crypto.randomBytes(16).toString("hex");
    const { userId, title, description } = req.body
    console.log(req.body)
    if (!id || ! req.body) {
        res.status(400).json({ message: "Некорректные данные" })
    }
    if (req.body === "") {
        res.status(400).json({ message: "Некорректные данные" })
    }
    const post = Post.build({
        id: id,
        userId: userId,
        title: title,
        description: description,
    })
    await post.save()
    res.json(post)
}

exports.getPosts = (req, res) => {
    res.send("ALL POSTS!!")
}