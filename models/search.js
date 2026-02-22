const db = require("./../db/query");

const { rating } = require("./reviews");

const m = {};

m.gets = async (title = null, category = null) => {
  try {
    let where = ``;
    if (title || (category && category != "all")) {
      where += ` WHERE`;
      if (title) where += ` Title LIKE '%${title}%'`;
      if (title && category && category != "all") where += ` AND`;
      if (category && category != "all") {
        let cate = 1;
        if (category == "film") cate = 1;
        if (category == "book") cate = 2;
        if (category == "course") cate = 3;
        where += ` IDCategory = ${cate}`;
      }
    }

    const [books, films, courses] = await Promise.all([
      db(
        "SELECT * FROM books b JOIN content c ON b.IDContent = c.IDContent" +
          where,
      ),
      db(
        "SELECT * FROM films f JOIN content c ON f.IDContent = c.IDContent" +
          where,
      ),
      db(
        "SELECT * FROM courses cr JOIN content c ON cr.IDContent = c.IDContent" +
          where,
      ),
    ]);

    const allResults = [
      ...books.map((row) => ({ ...row, source: "book" })),
      ...films.map((row) => ({ ...row, source: "film" })),
      ...courses.map((row) => ({ ...row, source: "course" })),
    ];

    allResults.sort((a, b) => a.IDContent - b.IDContent);

    for (let q in allResults) {
      const getRat = await rating(allResults[q].IDContent);
      if (getRat.is) {
        const avg = getRat.get.avgRating
          ? parseFloat(getRat.get.avgRating).toFixed(1)
          : "0.0";
        const count = getRat.get.countReviews;

        allResults[q].AverageRating = avg;
        allResults[q].RatingCount = count;
      }
    }

    for (let q in allResults) {
      if (allResults[q].AverageRating < 3) {
        delete allResults[q];
      }
    }

    return { is: true, get: allResults };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

module.exports = m;
