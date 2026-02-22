require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const layout = require("express-ejs-layouts");
const path = require("path");

const routes = require("./routes");

const PORT = process.env.PORT || 3000;

const app = express();

// Настройка EJS
app.use(layout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Статика (CSS, JS)
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist")),
);

// Парсинг JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройка хранилища сессий
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  createDatabaseTable: true,
  schema: {
    tableName: "sessions",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
});

// Подключение сессий
app.use(
  session({
    key: "user_sid",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false, // не сохраняем пустые сессии
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);

app.use((req, res, next) => {
  res.locals.userId = req.session?.userId || null;
  res.locals.username = req.session?.name || null;
  res.locals.pole = req.session?.pole || 3;
  res.locals.auth = !!req.session?.userId;
  res.locals.query = {
    q: req.query.q || null,
    page: req.query.page || null,
    category: req.query.category || null,
    search: req.query.search || null,
  };
  res.locals.params = {
    id: req.params.id || null,
  };
  if (req.path === "/logout") return next();
  next();
});

//route
app.use("/api", routes.api);
app.use("/", routes.home);
app.use("/books", routes.books);
app.use("/films", routes.films);
app.use("/courses", routes.courses);
app.use("/forum", routes.forum);
app.use("/resources", routes.resources);
app.use("/profile", routes.profile);
app.use("/recommendations", routes.recommendations);

// ⚠️ 404 — если ни один маршрут не подошёл
app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ is: false, msg: "API маршрут не найден" });
  }
  res.status(404).render("404", {
    title: "Страница не найдена",
  });
});

// 🚨 Обработчик ошибок
app.use((err, req, res, next) => {
  console.error("🚨 Серверная ошибка:", err.stack);

  if (req.path.startsWith("/api")) {
    return res.status(500).json({ is: false, msg: "Ошибка сервера" });
  }

  res.status(500).render("500", {
    title: "Внутренняя ошибка",
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на сайт http://localhost:${PORT}`);
});
