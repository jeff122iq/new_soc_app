const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const crypto = require("crypto");

exports.register = async(req, res) => {
    const id = crypto.randomBytes(16).toString("hex");

    const { password, confirmPassword, email } = req.body || {};
    if (!email) {
        res.status(400).json({message: "Заполните поле email!"})
    }
    const userEmail = await User.findOne({where: {email: email}});
    if (userEmail) {
        return res.status(400).json({message: "Пользователь уже создан"});
    }
    if (!password) {
        return res.status(400).json({message: "Заполните поле password!"})
    }
    if (password.length > 16) {
        return res.status(400).json({message: "Максимальная длиннка пароля 16 символов!"})
    }
    if (password.length < 6) {
        return res.status(400).json({message: "Минимальная длиннка пароля 5 символов!"})
    }
    const passwordHash = await bcrypt.hash(password, 10);

    let user = User.build({
        id: id,
        email: email,
        password: passwordHash,
        confirmPassword: passwordHash
    });
    if (password === confirmPassword) {
        console.log(user);
        console.log(passwordHash)

        await user.save();
        res.send(user);
        console.log(`${"\x1b[33m"}REGISTER SUCCESS!`, "\x1b[0m");
    } else {
        res.status(400).json({message: "Пароль не совпадает"})
    }
}

exports.login = async (req, res) => {
    const password = req.body.password
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль" });
    }
    // Access token generate
    const AccessToken = jwt.sign(
        { email: user.email, name: user.name },
        config.get("JWT_SECRET"), {expiresIn: "1h"}
    );
    res.json({ AccessToken, name: user.name, email: user.email });
    console.log(`${"\x1b[33m"}LOG-IN SUCCESS!`, "\x1b[0m");
}

exports.home = (req, res) => {
    res.send("Home")
}