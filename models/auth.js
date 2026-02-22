const db = require("./../db/query");

const m = {};

m.gets = async () => {
  try {
    const sql = "SELECT * FROM users ORDER BY UIUser ASC";
    const results = await db(sql);
    return { is: true, get: results };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.getId = async (arr) => {
  try {
    const sql = "SELECT * FROM users WHERE IDUser = ?";
    const results = await db(sql, arr);
    return { is: true, get: results[0] };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.getUsername = async (arr) => {
  try {
    const sql = "SELECT * FROM users WHERE Login = ?";
    const results = await db(sql, arr);
    return { is: true, get: results };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.getUsernameAndEmail = async (arr) => {
  try {
    const sql = "SELECT * FROM users WHERE Login = ? OR Email = ?";
    const results = await db(sql, arr);
    return { is: true, get: results };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.insert = async (arr) => {
  try {
    const sql =
      "INSERT INTO users (Name, Login, Password, Email, IDPole) VALUES (?, ?, ?, ?, ?)";
    const result = await db(sql, arr);
    return { is: true, get: result };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

module.exports = m;
