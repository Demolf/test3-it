const db = require("./../db/query");
const { rating } = require("./reviews");

const m = {};

m.gets = async () => {
  try {
    const sql =
      "SELECT * FROM books b JOIN content c ON b.IDContent = c.IDContent ORDER BY IDBook ASC";
    const results = await db(sql);
    for (let q in results) {
      const getRat = await rating(results[q].IDContent);
      if (getRat.is) {
        const avg = getRat.get.avgRating
          ? parseFloat(getRat.get.avgRating).toFixed(1)
          : "0.0";
        const count = getRat.get.countReviews;

        results[q].AverageRating = avg;
        results[q].RatingCount = count;
      }
    }
    return { is: true, get: results };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.getId = async (id) => {
  try {
    const sql =
      "SELECT * FROM books b JOIN content c ON b.IDContent = c.IDContent WHERE IDBook = ?";
    const results = await db(sql, [id]);
    const getRat = await rating(results[0].IDContent);
    if (getRat.is) {
      const avg = getRat.get.avgRating
        ? parseFloat(getRat.get.avgRating).toFixed(1)
        : "0.0";
      const count = getRat.get.countReviews;

      results[0].AverageRating = avg;
      results[0].RatingCount = count;
    }
    return { is: true, get: results[0] };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.getContentId = async () => {
  try {
    const sql =
      "SELECT * FROM books b JOIN content c ON b.IDContent = c.IDContent WHERE IDContent = ?";
    const results = await db(sql, [id]);
    const getRat = await rating(results[0].IDContent);
    if (getRat.is) {
      const avg = getRat.get.avgRating
        ? parseFloat(getRat.get.avgRating).toFixed(1)
        : "0.0";
      const count = getRat.get.countReviews;

      results[0].AverageRating = avg;
      results[0].RatingCount = count;
    }
    return { is: true, get: results[0] };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.insert = async (arr) => {
  try {
    const sql =
      "INSERT INTO books (IDContent , Author, Publisher, PageCount) VALUES (?, ?, ?, ?)";
    const result = await db(sql, arr);
    return { is: true, get: result };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.delete = async (id) => {
  try {
    const sql = "DELETE FROM books WHERE id = ?";
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

m.deleteContentId = async (id) => {
  try {
    const sql = "DELETE FROM films WHERE IDContent = ?";
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
