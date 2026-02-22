const db = require("./../db/query");

const m = {};

m.gets = async () => {
  try {
    const sql = "SELECT * FROM content ORDER BY IDContent ASC";
    const results = await db(sql);
    return { is: true, get: results };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.getId = async (id) => {
  try {
    const sql =
      "SELECT * FROM content WHERE IDContent = ? ORDER BY IDContent ASC";
    const results = await db(sql, [id]);
    return { is: true, get: results[0] };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.insert = async (arr) => {
  try {
    const sql = `INSERT INTO content (Title, Description, IDCategory, CoverImage, URL, HasSubtitles, HasSignLanguage, HasAudio, AverageRating, RatingCount, IsApproved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await db(sql, arr);
    return { is: true, get: result };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.delete = async (id) => {
  try {
    const sql = "DELETE FROM content WHERE IDContent = ?";
    const result = await db(sql, [id]);

    if (result.affectedRows === 0) {
      return { is: false, get: null };
    }

    return { is: true, get: result };
  } catch (err) {
    console.error("Ошибка при удалении книги:", err);
    return { is: false, get: err };
  }
};

module.exports = m;
