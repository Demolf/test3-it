const m = {};

m.gets = async (id) => {
  return {
    is: true,
    get: [
      {
        IDRecommendation: 1,
        Title: "Интерстеллар с ЖЯ",
        Description:
          "Ты смотрел похожие sci-fi с субтитрами — вот отличный вариант с жестовым переводом.",
        HasAudio: 0,
        img: "image 1.png",
        AssignLanguage: 1,
        HasSubtitles: 1,
        easyRead: 0,
        URL: "",
      },
      {
        IDRecommendation: 2,
        Title: "Продвинутый РЖЯ — уровень 2",
        Description:
          "После базового курса тебе может быть интересно углубиться — видео + субтитры.",
        HasAudio: 0,
        img: "_page-0001.png",
        AssignLanguage: 1,
        HasSubtitles: 1,
        easyRead: 0,
        URL: "",
      },
      {
        IDRecommendation: 3,
        Title: "Классика в Легко читаемый",
        Description:
          "Упрощённые версии книг с картинками и озвучкой — для лёгкого чтения.",
        HasAudio: 0,
        img: "maxresdefault 1.png",
        AssignLanguage: 1,
        HasSubtitles: 0,
        easyRead: 1,
        URL: "",
      },
      {
        IDRecommendation: 4,
        Title: "Сайт ВОГ — новости и видео",
        Description: "Актуальные новости глухих + видео на РЖЯ с субтитрами.",
        HasAudio: 0,
        img: "image 13.svg",
        AssignLanguage: 1,
        HasSubtitles: 1,
        easyRead: 0,
        URL: "",
      },
      {
        IDRecommendation: 5,
        Title: "Страна глухих — классика",
        Description:
          "Рекомендуется всем, кто интересуется жизнью глухих — субтитры + РЖЯ.",
        HasAudio: 0,
        img: "e7216975-f7d3-4105-81fe-36b965aca77c 1.png",
        AssignLanguage: 1,
        HasSubtitles: 1,
        easyRead: 0,
        URL: "",
      },
    ],
  };
};

module.exports = m;
