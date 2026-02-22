const express = require("express");
const router = express.Router();
const { auth } = require("./../../models");
const bcryptjs = require("bcryptjs");

// Регистрация
router.post("/register", async (req, res) => {
  const { username, name, password, password2, email } = req.body;

  if (!username || !name || !password || !email) {
    return res.status(400).json({ is: false, msg: "Все поля обязательны" });
  } else if (password !== password2) {
    return res.status(400).json({ is: false, msg: "Пароль не одиноково" });
  }

  try {
    // Проверка существования
    const { get } = await auth.getUsernameAndEmail([username, email]);
    if (Boolean(get[0])) {
      return res
        .status(409)
        .json({ is: false, msg: "Пользователь уже существует" });
    }

    // Хэширование пароля
    // const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(password, salt);

    // Сохранение
    await auth.insert([name, username, password, email, 3]);

    res.status(201).json({ is: true, msg: "Регистрация успешна" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ is: false, msg: "Ошибка сервера" });
  }
});

// Вход
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const { get } = await auth.getUsername([username]);
    const user = get[0];

    if (!Boolean(user)) {
      return res
        .status(401)
        .json({ is: false, msg: "Неверный логин или пароль" });
    }

    if (user.Password != password) {
      return res
        .status(401)
        .json({ is: false, msg: "Неверный логин или пароль" });
    }

    // const isMatch = await bcrypt.compare(password, user.Password);
    // if (!isMatch) {
    // Сохраняем пользователя в сессии
    req.session.userId = user.IDUser;
    req.session.name = user.Name;
    req.session.pole = user.IDPole;

    res.json({
      is: true,
      msg: "Вход выполнен",
    });
    // }
  } catch (err) {
    console.error(err);
    res.status(500).json({ is: false, msg: "Ошибка сервера" });
  }
});

// Проверка сессии
router.get("/session", (req, res) => {
  if (req.session.userId) {
    res.json({
      is: true,
      user: {
        id: req.session.userId,
        username: req.session.username,
        role: req.session.role,
      },
    });
  } else {
    res.status(401).json({ is: false, msg: "Не авторизован" });
  }
});

// Выход
router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.json({ is: false, msg: "Ошибка выхода" });
      }
      res.clearCookie("user_sid"); // имя куки из настроек сессии
      res.json({ is: true, msg: "Выход выполнен" });
    });
  } else {
    res.json({ is: true, msg: "Сессия отсутствует" });
  }
});

module.exports = router;
