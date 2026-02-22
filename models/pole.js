const db = require("./../db/query");

const m = {};

m.gets = async () => {
  try {
    const sql = "SELECT * FROM pole ORDER BY IDPole ASC";
    const results = await db(sql);
    return { is: true, get: results };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.getId = async () => {
  try {
    const sql = "SELECT * FROM pole WHERE IDPole = ? ORDER BY IDPole ASC";
    const results = await db(sql);
    return { is: true, get: results };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

module.exports = m;
