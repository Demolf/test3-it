-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Фев 22 2026 г., 07:50
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `books`
--

CREATE TABLE `books` (
  `IDBook` int(11) NOT NULL,
  `IDContent` int(11) NOT NULL,
  `Author` varchar(255) DEFAULT NULL,
  `Publisher` varchar(255) DEFAULT NULL,
  `PageCount` int(11) DEFAULT NULL,
  `YearPublished` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `books`
--

INSERT INTO `books` (`IDBook`, `IDContent`, `Author`, `Publisher`, `PageCount`, `YearPublished`) VALUES
(1, 3, 'Лев Толстой', 'Эксмо', 1300, 1869),
(2, 4, 'Федор Достоевский', 'Азбука', 672, 1866),
(3, 8, 'Лев Толстой', 'Азбука', 832, 1878),
(4, 9, 'Алексей Крылов', 'Нигма', 32, 1964),
(5, 10, 'Наталья Кошка', 'LitNet', 400, 2025);

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `IDCategory` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`IDCategory`, `Name`) VALUES
(2, 'книги'),
(3, 'курсы'),
(4, 'сайты'),
(1, 'фильмы');

-- --------------------------------------------------------

--
-- Структура таблицы `content`
--

CREATE TABLE `content` (
  `IDContent` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `IDCategory` int(11) NOT NULL,
  `CoverImage` varchar(500) DEFAULT NULL,
  `URL` varchar(500) DEFAULT NULL,
  `HasSubtitles` tinyint(1) DEFAULT 0,
  `HasSignLanguage` tinyint(1) DEFAULT 0,
  `HasAudio` tinyint(1) DEFAULT 0,
  `AverageRating` decimal(2,1) DEFAULT 0.0,
  `RatingCount` int(11) DEFAULT 0,
  `IsApproved` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `content`
--

INSERT INTO `content` (`IDContent`, `Title`, `Description`, `IDCategory`, `CoverImage`, `URL`, `HasSubtitles`, `HasSignLanguage`, `HasAudio`, `AverageRating`, `RatingCount`, `IsApproved`) VALUES
(1, 'Непослушник', 'Известный блогер-пранкер Дима в погоне за популярностью в сети устраивает жесткие розыгрыши. Один из пранков он снимает в стенах церкви, где служит его друг детства. Ролик провоцирует возмущение в среде верующих и на Диму заводят дело. ', 1, 'image1.png', 'https://kion.ru/film/neposlushnik-surdoperevod-subtitry-2021', 1, 1, 1, 0.0, 0, 1),
(2, 'Аватар', 'Джейк Салли, Нейтири и их дети переживают смерть Нетейама. Противостояние с корпорацией RDA обостряется, и теперь семье предстоит столкнуться с враждебным племенем ', 1, 'image2.png', 'https://rutube.ru/video/43b4d33d6b935a5df472e8b75eddb052/', 1, 0, 1, 0.0, 0, 1),
(3, 'Война и мир. Книга 1', 'В книгу вошли первый и второй тома романа «Война и мир» – одного из самых знаменитых произведений литературы XIX века.', 2, 'image3.png', 'https://mybook.ru/author/lev-tolstoj/vojna-i-mir-kniga-1-1/', 0, 0, 1, 0.0, 0, 1),
(4, 'Преступление и наказание', 'Философский роман.', 2, 'image4.png', 'https://mybook.ru/author/fedor-mihajlovich-dostoevskij/prestuplenie-i-nakazanie/', 0, 0, 1, 0.0, 0, 1),
(5, 'Python для начинающих', 'Видеохостинг с субтитрами', 3, 'image5.png', 'https://rutube.ru/plst/35943/', 1, 0, 1, 0.0, 0, 1),
(6, 'Жестовый язык', 'Курс по изучению жестового языка', 3, 'image6.png', 'https://signlang.ru/studyrsl/dict/', 0, 1, 0, 0.0, 0, 1),
(7, 'Big Data и Data Science', 'Сайт с несколько сайтов ', 3, 'image7.png', 'https://www.deafnet.ru/new.phtml?c=70&id=21222', 0, 0, 0, 0.0, 0, 1),
(8, 'Анна Каренина', '«Анна Каренина» поразила современников «вседневностью содержания». ', 2, 'image8.png', 'https://mybook.ru/author/lev-tolstoj/anna-karenina-1/', 0, 0, 1, 0.0, 0, 1),
(9, 'Кот василий ', 'Прижимаясь к стене лифта и со страхом глядя на мрачного громилу-соседа, перегородившего ей выход, Кет думала только о том, чтоб невредимой доехать до своего этажа. ', 2, 'image9.png', 'https://litnet.com/ru/reader/kot-vasilii-b165597', 0, 0, 1, 0.0, 0, 1),
(10, 'Опальная жена дракона', 'Десять долгих лет я скрывалась от дракона в лесах эльфов.', 2, 'image10.png', 'https://litnet.com/ru/reader/opalnaya-zhena-drakona-b570448?c=7419446&p=1', 0, 0, 0, 0.0, 0, 1),
(11, 'Я-Медведь дракона', 'Десять долгих лет скрывалась от дракона в лесах эльфов.', 1, 'image11.png', 'https://kion.ru/film/ya-medved-surdoperevod-subtitry?_msst=editorial&_mbi=0', 1, 1, 1, 0.0, 0, 1),
(12, 'Мира', 'Короткие видеокурсы - введение в самые современные профессии с субтитрами и переводом на русский жестовый язык.', 1, 'image12.png', 'https://kion.ru/film/mira-surdoperevod-subtitry?msst-editorial&msst=0', 1, 1, 1, 0.0, 0, 1),
(13, 'Старт в профессию', 'Начни учиться прямо сейчас бесплатно! Короткие курсы по востребованным профессиям с субтитрами и РЖЯ.', 3, 'image13.png', 'https://xn--90ahtxck8ax4ad.xn--p1ai/start', 1, 1, 0, 0.0, 0, 1),
(14, 'Властелин колец: Возвращение короля', 'Повелитель сил тьмы Саурон направляет свою бесчисленную армию под стены Минас-Тирита.', 1, 'image14.png', 'https://rutube.ru/video/f763beb56ed1161b01d155e455cbc27f/', 1, 0, 0, 0.0, 0, 1),
(15, 'ЗОЖ', '5 упражнений от боли в коленях. Центр образования глухих и жестового языка (зарегистрирован в 1998 году).', 3, 'image15.png', 'https://surdoclass.ru/watch/courses/665', 1, 1, 1, 0.0, 0, 1),
(16, 'Психология', 'Как бороться с выгоранием. Бесплатный курс с сурдопереводом и субтитрами.', 3, 'image16.png', 'https://surdoclass.ru/watch/lessons/158', 1, 1, 1, 0.0, 0, 1),
(17, 'Центр образования и исследования жестового языка', 'Центр им. Г.Л. Зайцевой (зарегистрирован в 1998 г., работает с 1992). Курсы РЖЯ с нуля, для продолжающих и продвинутых (очный/онлайн). Знакомство с культурой глухих, лексика, грамматика. Для родителей, специалистов и интересующихся.', 3, 'image17.png', 'https://deafsign.ru/', 1, 1, 0, 0.0, 35, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `courses`
--

CREATE TABLE `courses` (
  `IDCourse` int(11) NOT NULL,
  `IDContent` int(11) NOT NULL,
  `Platform` varchar(255) DEFAULT NULL,
  `Level` varchar(50) DEFAULT NULL,
  `DurationHours` int(11) DEFAULT NULL,
  `Author` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `courses`
--

INSERT INTO `courses` (`IDCourse`, `IDContent`, `Platform`, `Level`, `DurationHours`, `Author`) VALUES
(1, 5, 'Stepik', 'начинающий', 24, 'Иван Петров'),
(2, 6, 'Знания', 'любой', 36, 'Анна Сидорова'),
(3, 13, 'Свой сайт', 'начальный', 3, 'Фонд'),
(4, 15, 'Surdoclass', 'начальный', 5, 'Василий Косарев'),
(5, 16, 'Surdoclass', 'начальный', 8, 'Василий Косарев'),
(6, 7, 'DeafNet', 'средний', 30, 'Неизвестно'),
(7, 17, 'Свой сайт', 'сложный', NULL, 'Семенова Дарья');

-- --------------------------------------------------------

--
-- Структура таблицы `films`
--

CREATE TABLE `films` (
  `IDFilm` int(11) NOT NULL,
  `IDContent` int(11) NOT NULL,
  `Director` varchar(255) DEFAULT NULL,
  `Actors` text DEFAULT NULL,
  `DurationMinutes` int(11) DEFAULT NULL,
  `ReleaseYear` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `films`
--

INSERT INTO `films` (`IDFilm`, `IDContent`, `Director`, `Actors`, `DurationMinutes`, `ReleaseYear`) VALUES
(1, 1, 'Владимир Котт', 'Виктор Хориняк, Аглая Тарасова,Таисия Вилкова', 110, 2022),
(2, 2, 'Джеймс Кэмерон', 'Джейк Салли, Зои Салдана,Сигурни Уивер', 197, 2025),
(3, 11, 'Кирилл Кемниц. ', 'Никита Кологривый, Агата Муцениеце', 97, 2003),
(4, 12, ' Дмитрия Киселёва.', 'Вероника Устимова, Анатолий Белый', 110, 2022),
(5, 14, 'Питер Джексон', 'Элайджа Вуд, Вигго Мортенсен, Шон Эстин', 120, 2003);

-- --------------------------------------------------------

--
-- Структура таблицы `pole`
--

CREATE TABLE `pole` (
  `IDPole` int(11) NOT NULL,
  `NamePole` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `pole`
--

INSERT INTO `pole` (`IDPole`, `NamePole`) VALUES
(1, 'admin'),
(2, 'moderator'),
(3, 'user');

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `IDReview` int(11) NOT NULL,
  `IDUser` int(11) NOT NULL,
  `IDContent` int(11) NOT NULL,
  `Rating` int(11) DEFAULT NULL,
  `Comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`IDReview`, `IDUser`, `IDContent`, `Rating`, `Comment`) VALUES
(1, 1, 1, 5, 'Отличный фильм, субтитры качественные!'),
(2, 2, 1, 4, 'Хороший фильм, но жестовый перевод мог бы быть лучше'),
(3, 3, 3, 5, 'Книга супер, аудиоверсия очень помогла'),
(4, 1, 5, 5, 'Курс понятный, субтитры отличные'),
(5, 2, 7, 4, 'YouTube удобно смотреть с субтитрами'),
(8, 1, 2, 5, 'фывф'),
(10, 1, 2, 4, 'фывфы'),
(11, 1, 2, 5, 'фыв'),
(12, 1, 2, 4, 'фывфыв');

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('iRVlGz_dKCrnR_7Hupmgnan4wDxUPdsf', 1771828364, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2026-02-23T06:32:33.628Z\",\"httpOnly\":true,\"path\":\"/\"},\"userId\":4,\"name\":\"Админ\",\"pole\":1}'),
('xVGTvMSwSXgTIiB6T3vvHvZ9TLWbHGx1', 1771828511, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2026-02-22T22:07:00.001Z\",\"httpOnly\":true,\"path\":\"/\"},\"userId\":1,\"name\":\"Иван\",\"pole\":3}');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `IDUser` int(11) NOT NULL,
  `Fam` varchar(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Otzh` varchar(50) DEFAULT NULL,
  `DateBirth` date DEFAULT NULL,
  `Login` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `IDPole` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`IDUser`, `Fam`, `Name`, `Otzh`, `DateBirth`, `Login`, `Password`, `Email`, `IDPole`) VALUES
(1, 'Иванов', 'Иван', 'Иванович', '1990-05-15', 'ivan123', '123456', 'ivan@mail.ru', 3),
(2, 'Петров', 'Петр', 'Петрович', '1985-10-20', 'petr123', '123456', 'petr@mail.ru', 3),
(3, 'Сидорова', 'Анна', 'Сергеевна', '1995-03-10', 'anna123', '123456', 'anna@mail.ru', 3),
(4, 'Админов', 'Админ', 'Админович', '1980-01-01', 'admin', 'admin123', 'admin@mail.ru', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `websites`
--

CREATE TABLE `websites` (
  `IDWebsite` int(11) NOT NULL,
  `IDContent` int(11) NOT NULL,
  `SiteURL` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `websites`
--

INSERT INTO `websites` (`IDWebsite`, `IDContent`, `SiteURL`) VALUES
(1, 7, 'https://www.youtube.com'),
(2, 8, 'https://www.viki.com');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`IDBook`),
  ADD UNIQUE KEY `IDContent` (`IDContent`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`IDCategory`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Индексы таблицы `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`IDContent`),
  ADD KEY `IDCategory` (`IDCategory`);

--
-- Индексы таблицы `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`IDCourse`),
  ADD UNIQUE KEY `IDContent` (`IDContent`);

--
-- Индексы таблицы `films`
--
ALTER TABLE `films`
  ADD PRIMARY KEY (`IDFilm`),
  ADD UNIQUE KEY `IDContent` (`IDContent`);

--
-- Индексы таблицы `pole`
--
ALTER TABLE `pole`
  ADD PRIMARY KEY (`IDPole`),
  ADD UNIQUE KEY `NamePole` (`NamePole`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`IDReview`),
  ADD KEY `IDContent` (`IDContent`);

--
-- Индексы таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`IDUser`),
  ADD UNIQUE KEY `Login` (`Login`),
  ADD KEY `IDPole` (`IDPole`);

--
-- Индексы таблицы `websites`
--
ALTER TABLE `websites`
  ADD PRIMARY KEY (`IDWebsite`),
  ADD UNIQUE KEY `IDContent` (`IDContent`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `books`
--
ALTER TABLE `books`
  MODIFY `IDBook` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `IDCategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `content`
--
ALTER TABLE `content`
  MODIFY `IDContent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `courses`
--
ALTER TABLE `courses`
  MODIFY `IDCourse` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `films`
--
ALTER TABLE `films`
  MODIFY `IDFilm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `pole`
--
ALTER TABLE `pole`
  MODIFY `IDPole` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `IDReview` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `IDUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `websites`
--
ALTER TABLE `websites`
  MODIFY `IDWebsite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`IDContent`) REFERENCES `content` (`IDContent`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `content_ibfk_1` FOREIGN KEY (`IDCategory`) REFERENCES `categories` (`IDCategory`);

--
-- Ограничения внешнего ключа таблицы `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`IDContent`) REFERENCES `content` (`IDContent`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `films`
--
ALTER TABLE `films`
  ADD CONSTRAINT `films_ibfk_1` FOREIGN KEY (`IDContent`) REFERENCES `content` (`IDContent`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `users` (`IDUser`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`IDContent`) REFERENCES `content` (`IDContent`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`IDPole`) REFERENCES `pole` (`IDPole`);

--
-- Ограничения внешнего ключа таблицы `websites`
--
ALTER TABLE `websites`
  ADD CONSTRAINT `websites_ibfk_1` FOREIGN KEY (`IDContent`) REFERENCES `content` (`IDContent`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
