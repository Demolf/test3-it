const db = require("./config");

module.exports = (sql, params) => {
  return new Promise((resolve, reject) => {
    const queryCallback = (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        console.error("SQL:", sql);
        console.error("Params:", params);
        reject(err);
      } else {
        resolve(results);
      }
    };

    if (params) {
      db.query(sql, params, queryCallback);
    } else {
      db.query(sql, queryCallback);
    }
  });
};
