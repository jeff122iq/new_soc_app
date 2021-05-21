const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");


exports.register = async(req, res) => {
    // console.log(req.body)
    if (req.body.email === "") {
        res.status(400).json({ message: "Заполните поле email!" })
    }
    const email = await User.findOne({ where: { email: req.body.email } });
    if (email) {
        return res.status(400).json({ message: "Пользователь уже создан" });
    }
    if (req.body.password === "") {
        return res.status(400).json({ message: "Заполните поле password!" })
    } else if(req.body.password.length > 16) {
        return res.status(400).json({ message: "Максимальная длиннка пароля 16 символов!" })
    } else if(req.body.password.length < 6) {
        return res.status(400).json({ message: "Минимальная длиннка пароля 5 символов!" })
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    let user = User.build({
        email: req.body.email,
        password: passwordHash,
    });
    console.log(req.body);
    console.log(passwordHash)

    await user.save();
    res.send(user);
    console.log(`REGISTER SUCCESS`);
}

exports.login = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль" });
    }
    // Access token generate
    const AccessToken = jwt.sign(
        { email: user.email, name: user.name },
        config.get("JWT_SECRET"),
        {
            expiresIn: "1h",
        }
    );
    res.json({ AccessToken, name: user.name, email: user.email });
    console.log(`LOG-IN SUCCES`);
}

exports.home = (req, res) => {
    res.send("Home")
}