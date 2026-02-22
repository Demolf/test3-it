const db = require("./../db/query");

const m = {};

m.gets = async () => {
  try {
    const sql = "SELECT * FROM reviews ORDER BY IDReview ASC";
    const results = await db(sql);
    const getRat = await m.rating(results[0].IDContent);
    if (getRat.is) {
      const avg = getRat.get.avgRating
        ? parseFloat(getRat.get.avgRating).toFixed(1)
        : "0.0";
      const count = getRat.get.countReviews;

      results[0].AverageRating = avg;
      results[0].RatingCount = count;
    }
    return { is: true, get: results };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.getId = async (id) => {
  try {
    const sql = "SELECT * FROM reviews WHERE IDReview = ?";
    const results = await db(sql, [id]);

    const getRat = await m.rating(results[0].IDContent);
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

m.getContentId = async (id) => {
  try {
    const sql =
      "SELECT b.*, c.Name FROM reviews b JOIN users c ON b.IDUser = c.IDUser WHERE IDContent = ? ORDER BY IDReview ASC";
    const results = await db(sql, [id]);

    if (results[0]?.IDContent) {
      const getRat = await m.rating(results[0].IDContent);
      if (getRat.is) {
        const avg = getRat.get.avgRating
          ? parseFloat(getRat.get.avgRating).toFixed(1)
          : "0.0";
        const count = getRat.get.countReviews;

        results[0].AverageRating = avg;
        results[0].RatingCount = count;
      }
    } else {
      console.error("Ошибка запроса:", {
        msg: "Отзывы не найдены",
      });
      return {
        is: false,
        get: {
          msg: "Отзывы не найдены",
        },
      };
    }
    return { is: true, get: results };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.getUserId = async () => {
  try {
    const sql = "SELECT * FROM reviews WHERE IDUser = ? ORDER BY IDReview ASC";
    const results = await db(sql);
    return { is: true, get: results };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.insert = async (arr) => {
  try {
    const sql = `INSERT INTO reviews (IDUser, IDContent, Rating, Comment) VALUES (?, ?, ?, ?)`;
    const result = await db(sql, arr);
    return { is: true, get: result };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.rating = async (id) => {
  try {
    const sql = `SELECT 
        AVG(Rating) AS avgRating,
        COUNT(*) AS countReviews
      FROM reviews 
      WHERE IDContent = ?`;
    const result = await db(sql, [id]);
    return { is: true, get: result[0] };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

// m.delete = async (arr) => {
//   try {
//     const sql = "DELETE FROM reviews WHERE id = ?";
//     const result = await db(sql, [id]);

//     if (result.affectedRows === 0) {
//       return { is: false, get: null, msg: "Книга с таким ID не найдена" };
//     }

//     return { is: true, get: result, msg: "Книга удалена" };
//   } catch (err) {
//     console.error("Ошибка при удалении книги:", err);
//     return { is: false, get: err };
//   }
// };

module.exports = m;
