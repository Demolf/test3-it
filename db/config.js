const mysql = require("mysql2");

// Подключение к MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // 3306
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  charset: "utf8mb4",
});

// Проверка подключения к БД
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к MySQL:", err);
    return;
  }
  console.log("Подключено к MySQL");
});

// Сначала создаём базу данных, если её нет
const createDbQuery =
  "CREATE DATABASE IF NOT EXISTS test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;";
db.query(createDbQuery, (err, result) => {
  if (err) {
    console.error("Ошибка при создании базы данных test:", err);
    return;
  }
  console.log("База данных test готова к использованию");

  // Теперь подключаемся к базе данных test
  db.changeUser({ database: "test" }, (err) => {
    if (err) {
      console.error("Ошибка при подключении к базе данных test:", err);
      return;
    }

    // Создаём таблицу, если её нет
    Pole();
    Users();
    Categories();
    Content();
    Films();
    Books();
    Courses();
    Websites();
    Reviews();
  });
});

const Pole = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS Pole (
          IDPole INT PRIMARY KEY AUTO_INCREMENT,
          NamePole VARCHAR(15) NOT NULL UNIQUE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Ошибка при создании таблицы Pole:", err);
    } else {
      console.log("Таблица Pole готова к использованию");
    }
  });
};

const Users = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS Users (
          IDUser INT PRIMARY KEY AUTO_INCREMENT,
          Name VARCHAR(50) NOT NULL,
          Login VARCHAR(50) NOT NULL UNIQUE,
          Password VARCHAR(255) NOT NULL,
          Email VARCHAR(100) NOT NULL UNIQUE,
          IDPole INT NOT NULL,
          FOREIGN KEY (IDPole) REFERENCES Pole(IDPole)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;

  return db.query(sql, (err, result) => {
    if (err) {
      console.error("Ошибка при создании таблицы Users:", err);
    } else {
      console.log("Таблица Users готова к использованию");
    }
  });
};

const Categories = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS Categories (
          IDCategory INT PRIMARY KEY AUTO_INCREMENT,
          Name VARCHAR(100) NOT NULL UNIQUE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;

  return db.query(sql, (err, result) => {
    if (err) {
      console.error("Ошибка при создании таблицы Categories:", err);
    } else {
      console.log("Таблица Categories готова к использованию");
    }
  });
};

const Content = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS Content  (
          IDContent INT PRIMARY KEY AUTO_INCREMENT,
          Title VARCHAR(255) NOT NULL,
          Description TEXT,
          IDCategory INT NOT NULL,
          CoverImage VARCHAR(500),
          URL VARCHAR(500),
          HasSubtitles BOOLEAN DEFAULT FALSE,
          HasSignLanguage BOOLEAN DEFAULT FALSE,
          HasAudio BOOLEAN DEFAULT FALSE,
          AverageRating DECIMAL(2,1) DEFAULT 0,
          RatingCount INT DEFAULT 0,
          IsApproved BOOLEAN DEFAULT TRUE,
          FOREIGN KEY (IDCategory) REFERENCES Categories(IDCategory)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;

  return db.query(sql, (err, result) => {
    if (err) {
      console.error("Ошибка при создании таблицы Content:", err);
    } else {
      console.log("Таблица Content готова к использованию");
    }
  });
};

const Films = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS Films (
          IDFilm INT PRIMARY KEY AUTO_INCREMENT,
          IDContent INT NOT NULL UNIQUE,
          Director VARCHAR(255),
          Actors TEXT,
          DurationMinutes INT,
          ReleaseYear INT,
          FOREIGN KEY (IDContent) REFERENCES Content(IDContent) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;

  return db.query(sql, (err, result) => {
    if (err) {
      console.error("Ошибка при создании таблицы Films:", err);
    } else {
      console.log("Таблица Films готова к использованию");
    }
  });
};

const Books = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS Books  (
          IDBook INT PRIMARY KEY AUTO_INCREMENT,
          IDContent INT NOT NULL UNIQUE,
          Author VARCHAR(255),
          Publisher VARCHAR(255),
          PageCount INT,
          YearPublished INT,
          FOREIGN KEY (IDContent) REFERENCES Content(IDContent) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;

  return db.query(sql, (err, result) => {
    if (err) {
      console.error("Ошибка при создании таблицы Books:", err);
    } else {
      console.log("Таблица Books готова к использованию");
    }
  });
};

const Courses = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS Courses (
          IDCourse INT PRIMARY KEY AUTO_INCREMENT,
          IDContent INT NOT NULL UNIQUE,
          Platform VARCHAR(255),
          Level VARCHAR(50),
          DurationHours INT,
          Author VARCHAR(255),
          FOREIGN KEY (IDContent) REFERENCES Content(IDContent) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;

  return db.query(sql, (err, result) => {
    if (err) {
      console.error("Ошибка при создании таблицы Courses:", err);
    } else {
      console.log("Таблица Courses готова к использованию");
    }
  });
};

const Websites = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS Websites (
          IDWebsite INT PRIMARY KEY AUTO_INCREMENT,
          IDContent INT NOT NULL UNIQUE,
          SiteURL VARCHAR(500) NOT NULL,
          FOREIGN KEY (IDContent) REFERENCES Content(IDContent) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;

  return db.query(sql, (err, result) => {
    if (err) {
      console.error("Ошибка при создании таблицы Websites:", err);
    } else {
      console.log("Таблица Websites готова к использованию");
    }
  });
};

const Reviews = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS Reviews (
          IDReview INT PRIMARY KEY AUTO_INCREMENT,
          IDUser INT NOT NULL,
          IDContent INT NOT NULL,
          Rating INT CHECK (Rating >= 1 AND Rating <= 5),
          Comment TEXT,          
          FOREIGN KEY (IDUser) REFERENCES Users(IDUser) ON DELETE CASCADE,
          FOREIGN KEY (IDContent) REFERENCES Content(IDContent) ON DELETE CASCADE,          
          UNIQUE KEY unique_user_content (IDUser, IDContent)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;

  return db.query(sql, (err, result) => {
    if (err) {
      console.error("Ошибка при создании таблицы Reviews:", err);
    } else {
      console.log("Таблица Reviews готова к использованию");
    }
  });
};

module.exports = db;
