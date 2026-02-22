const express = require("express");
const router = express.Router();
const multer = require("multer"); // для загрузки файлов

const { content, books, films, courses } = require("./../../models"); // модели БД

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/"); // папка для сохранения
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // уникальное имя
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Только изображения разрешены"));
    }
  },
});

// POST /api/content — отправить
router.post("/", upload.single("coverImage"), async (req, res) => {
  try {
    if (!!req.session.userId) {
      const {
        type,
        title,
        url,
        description,
        hasSubtitles,
        hasSignLanguage,
        hasAudio,
        director,
        actors,
        author,
        publisher,
        pageCount,
        platform,
        level,
        durationHours,
        durationMinutes,
      } = req.body;
      const { filename } = req.file;

      if (!type || !title || !filename)
        return res.status(400).json({ msg: "Имя и сообщение обязательны" });
      const data = [
        title,
        description || null,
        Number(type),
        filename,
        url || null,
        Number(hasSubtitles) || null,
        Number(hasSignLanguage) || null,
        Number(hasAudio) || null,
        0, // AverageRating
        0, // RatingCount
        0, // IsApproved (на модерации)
      ];
      const info = await content.insert(data);

      if (info.is) {
        if (type == 1) {
          const data = [
            info.get.insertId,
            director || null,
            actors || null,
            durationMinutes || 1,
          ];
          await films.insert(data);
        } else if (type == 2) {
          const data = [
            info.get.insertId,
            author || null,
            publisher || null,
            pageCount || null,
          ];
          await books.insert(data);
        } else if (type == 3) {
          const data = [
            info.get.insertId,
            platform || null,
            level || null,
            durationHours || 60 * 24,
            author || null,
          ];
          await courses.insert(data);
        }
      }

      res.status(201).json({ info, data });
    } else
      return res.status(400).json({ is: false, msg: "Войти или Регистрация" });
  } catch (err) {
    return res.status(500).json({ is: false, msg: "Ошибка сервера" });
  }
});

module.exports = router;
