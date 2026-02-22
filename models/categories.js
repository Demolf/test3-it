const db = require("./../db/query");

const m = {};

m.gets = async () => {
  try {
    const sql =
      "SELECT * FROM categories ORDER BY IDCategory ASC";
    const results = await db(sql);
    return { is: true, get: results };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.getId = async () => {
  try {
    const sql =
      "SELECT * FROM categories WHERE IDCategory = ? ORDER BY IDCategory ASC";
    const results = await db(sql);
    return { is: true, get: results };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

// m.insert = async (arr) => {
//   try {
//     const sql = "INSERT INTO categories (content, name) VALUES (?, ?)";
//     const result = await db(sql, arr);
//     return { is: true, get: result };
//   } catch (err) {
//     console.error("Ошибка запроса:", err);
//     return { is: false, get: err };
//   }
// };

// m.delete = async (arr) => {
//   try {
//     const sql = "DELETE FROM categories WHERE id = ?";
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
