// public/js/javascript.js

$(() => {
  // Поиск
  $(".search-block")
    .on("input", 'input[name="search"]', handleSearch)
    .on("change", 'select[name="category"]', handleSearch);

  async function handleSearch(e) {
    e.preventDefault();
    const data = {
      title: $('.search-block input[name="search"]').val().trim(),
      category: $('.search-block select[name="category"]').val(),
    };

    $("#catalog .row").html("Подождите . . . ");

    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(async () => {
      $("#catalog .row").html("");
      if (data.category) {
        let url = "/api/search";
        if (data.title || data.category) {
          url += "?";
          if (data.title) url += `title=${data.title}`;
          if (data.title && data.category) url += `&`;
          if (data.category) url += `category=${data.category}`;
        }
        const getData = await GET(url);
        if (getData.is) {
          for (let q in getData.get) {
            $("#catalog .row").append(html.card(getData.get[q]));
          }

          OpenInfo();
          OpenReview();
          DeleteEdit();
        } else alert("Не удалось отправить сообщение. Проверьте подключение.");
      }
    }, 300);
  }

  // Отзывы

  function OpenReview() {
    $(".openReview").on("click", async function (e) {
      const contentId = $(this).attr("data-id");
      const id = "reviewModal";
      $("#reviewModal").css("display", "flex").addClass("no-scroll");

      $("#reviewModal .modal-close").on("click", (e) => {
        closeModal(id);
        $("#reviewsList").html(`Загрузка . . . `);
      });

      await loadReviews(contentId);

      $("#reviewModal button").on("click", async function (e) {
        e.preventDefault();

        const data = {
          contentId,
          comment: $("#reviewModal #textInput").val().trim(),
          rating: $("#reviewModal #ratingInput").val(),
        };
        console.log(data);

        if (data.contentId && data.comment && data.rating) {
          const get = await POST("/api/reviews", data);
          console.log(get);
          if (get.info.is) location.href = location.href;
        }
      });
      // Закрытие по клику вне окна
      window.addEventListener("click", (e) => {
        const modal = document.getElementById(id);
        if (e.target === modal) {
          closeModal(id);
          $("#reviewsList").html(`Загрузка . . . `);
        }
      });
    });
  }

  OpenReview();

  async function loadReviews(id) {
    console.log("loadReviews", id);
    const res = await GET(`/api/reviews/content/${id}`);

    console.log("loadReviews", id, res);
    if (res.get.length === 0) {
      $("#reviewsList").html(`<p>Пока нет отзывов. Будьте первым!</p>`);
      return;
    }
    if (res.is) {
      $("#reviewsList").html(
        res.get
          .map(
            (r) => `
      <div style="border-bottom: 1px solid #eee; padding: 0.8rem 0;">
        <strong>${r.Name}</strong> 
        <span>${"⭐".repeat(r.Rating)}</span>
        <p style="margin: 0.5rem 0 0 0;">${r.Comment}</p>
      </div>
    `,
          )
          .join(""),
      );
    } else {
      $("#reviewsList").html(`<p>Пока нет отзывов. Будьте первым!</p>`);
      return;
    }
  }

  // В карточке удалить или редактировать

  function DeleteEdit() {
    $(".infoModel .Edit").on("click", async function (e) {
      alert(`Редактировать (В разработке)[${$(this).attr("data-id")}]`);
    });

    $(".infoModel .Delete").on("click", async function (e) {
      const get = await POST("/api/delete", {
        type: $(this).attr("data-type"),
        id: $(this).attr("data-id"),
      });
      alert(`Вы удалили.`);
      if (get.info.is) location.href = location.href;
    });
  }

  DeleteEdit();

  // Информация

  function OpenInfo() {
    $(".openInfo").on("click", async function (e) {
      const id = "infoModal";
      $(`#${id}`).css("display", "flex").addClass("no-scroll");

      const type = $(this).attr("data-type");
      const getId = $(this).attr("data-id");

      console.log(`./api/${type}/${getId}`);

      const data = await GET(`./api/${type}/${getId}`);
      $(`#${id} .html`).html(html.info(data.get));

      $(`#${id} .modal-close`).on("click", function (e) {
        closeModal(id);
      });
      // Закрытие по клику вне окна
      window.addEventListener("click", (e) => {
        const modal = document.getElementById(id);
        if (e.target === modal) {
          closeModal(id);
        }
      });
    });
  }
  OpenInfo();

  // Логин и Регистрация

  $(".auth-trigger .btn").on("click", (e) => {
    const id = "loginModal";
    $(`#${id}`).css("display", "flex").addClass("no-scroll");

    $(`#${id} .tabs button`).on("click", function (e) {
      // Убираем активные стили со всех
      $(`#${id} .tabs button`).removeClass("active");
      $(`#${id} .tab-content`).hide();

      // Добавляем активный класс к текущей кнопке
      $(this).addClass("active");

      // Получаем ID вкладки
      const tabId = $(this).attr("data-tab");

      // Показываем нужную вкладку
      $(`#${id} #${tabId}`).show();
    });
    $(`#${id} .modal-close`).on("click", function (e) {
      closeModal(id);
    });

    // Закрытие по клику вне окна
    window.addEventListener("click", (e) => {
      const modal = document.getElementById(id);
      if (e.target === modal) {
        closeModal(id);
      }
    });
  });

  $("#registerForm .btn").on("click", async (e) => {
    e.preventDefault();

    const data = {
      name: $("#registerForm #rname").val().trim(),
      username: $("#registerForm #rusername").val().trim(),
      email: $("#registerForm #remail").val().trim(),
      password: $("#registerForm #rpassword").val().trim(),
      password2: $("#registerForm #rpassword2").val().trim(),
    };

    if (
      data.name &&
      data.username &&
      data.email &&
      data.password &&
      data.password2
    ) {
      const get = await POST("/api/auth/register", data);
      alert(get.msg);
      if (get.is) location.href = location.href;
    }
  });

  $("#loginForm .btn").on("click", async (e) => {
    e.preventDefault();

    const data = {
      username: $("#loginForm #lusername").val().trim(),
      password: $("#loginForm #lpassword").val().trim(),
    };

    console.log(data);

    if (data.username && data.password) {
      const get = await POST("/api/auth/login", data);
      alert(get.msg);
      if (get.is) location.href = location.href;
    }
  });

  // Закрыть модальное окно
  function closeModal(id) {
    $(`#${id}`).hide().removeClass("no-scroll");
  }

  // добавить Контент

  $("#addContentForm");

  $("#addContentForm")
    .on("change", 'select[name="type"]', async function (e) {
      const type = $('#addContentForm select[name="type"]').val();
      const setHtml = html.contentAdd(type);
      $("#addContentForm .setHtml").html(setHtml);
    })
    .on("submit", async function (e) {
      e.preventDefault();

      // вариант другой есть)
      const formData = new FormData(this);
      try {
        const res = await $.ajax({
          url: "/api/contents",
          method: "POST",
          data: formData,
          processData: false, // важно!
          contentType: false, // важно!
          success: (data) => data,
          error: (err) => err.responseJSON || { message: "Ошибка загрузки" },
        });

        console.log(res);
        if (res.info.is) {
          alert("Контент успешно отправлен на модерацию!");
          $("#addContentForm")[0].reset();
        } else {
          alert("Ошибка: " + res.message);
          console.log(res);
        }
      } catch (err) {
        alert("Ошибка подключения к серверу");
      }
    });

  // Запрос API

  async function POST(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (err) {
      console.log("Ошибка отправки сообщения:", err);
      alert("Не удалось отправить сообщение. Проверьте подключение.");
    }
  }

  async function GET(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      console.log("Ошибка получения данных:", err);
    }
  }

  // HTML

  const html = {
    card: (d) => {
      let img = `📚`;
      let id = ``;
      if (d.source == "book") {
        img = d.CoverImage
          ? `<img src="/images/${d.CoverImage}" class="card-img-top" alt="${d.Title}">`
          : `<div class="resource-icon">📚</div>`;
        id = d.IDBook;
      } else if (d.source == "film") {
        img = d.CoverImage
          ? `<img src="/images/${d.CoverImage}" class="card-img-top" alt="${d.Title}">`
          : `<div class="resource-icon">🎭</div>`;
        id = d.IDFilm;
      } else if (d.source == "course") {
        img = d.CoverImage
          ? `<img src="/images/${d.CoverImage}" class="card-img-top" alt="${d.Title}">`
          : `<div class="resource-icon">🎓</div>`;
        id = d.IDCourse;
      }

      // Логика для кнопки "Показать всё"
      const maxLength = 100;
      const desc = d.Description || "Описание отсутствует";
      const isLong = desc.length > maxLength;
      const shortDesc = isLong ? desc.slice(0, maxLength) + "..." : desc;

      let deleteEdit = ``;
      if (window.initialData?.pole == 1) {
        deleteEdit = `
        <div class="mt-3">
          <div class="disex jc">
            <div class="Edit atext" data-id="${d.IDContent}" data-type="${d.source}s">
              Редактировать
            </div>
            <div class="Delete atext" data-id="${d.IDContent}" data-type="${d.source}s">
              Удалить
            </div>
          </div>
        </div>`;
      }

      return `
      <div class="col">
        <div class="card h-100">
          ${img}
          <div class="card-body">
            <h5 class="card-title">${d.Title}</h5>

            <div class="description">
              <span class="blod mright">Описание:</span>
              <span class="desc-short">${shortDesc}</span>
              ${
                isLong
                  ? `<span class="desc-full" style="display:none;">${desc}</span>
                 <a href="#" class="read-more text-primary small ms-1">показать всё</a>`
                  : ""
              }
            </div>

            <div class="mb-2">
              <span class="badge badge-success">Рейтинг ${d.AverageRating || 0}</span>
              ${d.HasSubtitles ? '<span class="badge badge-info me-1">Субтитры</span>' : ""}
              ${d.HasAudio ? '<span class="badge badge-success me-1">Озвука</span>' : ""}
              ${d.AssignLanguage === 1 ? '<span class="badge badge-primary me-1">РЖЯ</span>' : ""}
              ${d.easyRead ? '<span class="badge badge-secondary">Легко читаемый</span>' : ""}
            </div>

            <div class="disex jc mb-3">
              <div class="btn btn-warning openInfo" data-id="${id}" data-type="${d.source}s">
                Подробнее
              </div>
              <div class="btn btn-primary openReview" data-id="${d.IDContent}">
                Отзыв
              </div>
            </div>

            ${deleteEdit}
          </div>
        </div>
      </div>`;
    },
    info: (d) => {
      let info = ``;

      if (d.IDBook) {
        info = `<div><span class="blod mright">Автор:</span> ${d.Author}</div>
        <div><span class="blod mright">Страницы:</span> ${d.PageCount}</div>
        <div><span class="blod mright">Издатель:</span> ${d.Publisher}</div>`;
      } else if (d.IDCourse) {
        info = `<div><span class="blod mright">Платформа:</span> ${d.Platform}</div>
        <div><span class="blod mright">Уровень:</span> ${d.Level}</div>
        <div><span class="blod mright">Время:</span> ${d.DurationHours} часов</div>
        <div><span class="blod mright">Автор:</span> ${d.Author}</div>`;
      } else if (d.IDFilm) {
        info = `<div><span class="blod mright">Режиссёр:</span> ${d.Director}</div>
        <div><span class="blod mright">Актеры:</span> ${d.Actors}</div>`;
      }
      return `
            <h5>${d.Title}</h5>
    
            <div class="description"><span class="blod mright">Описание:</span> ${d.Description}</div>

            ${info}

            <div class="mb-3">
              <span class="badge badge-success">Рейтинг ${d.AverageRating || '0.0'} </span>
              ${d.HasSubtitles ? '<span class="badge badge-info me-1">Субтитры</span>' : ""}
              ${d.HasAudio ? '<span class="badge badge-success me-1">Озвука</span>' : ""}
              ${d.AssignLanguage === 1 ? '<span class="badge badge-primary me-1">РЖЯ</span>' : ""}
              ${d.easyRead ? '<span class="badge badge-secondary">Легко читаемый</span>' : ""}
            </div>

            <a 
              href="${d.URL || "#"}" 
              class="btn btn-warning ${!d.URL ? "disabled" : ""}"
              target="${d.URL ? "_blank" : ""}"
              title="${!d.URL ? "Ссылка временно недоступна" : "Перейти"}"
            >
              ${d.URL ? "Зайдите" : "Сайта нет"}
            </a>
          `;
    },
    contentAdd: (d) => {
      if (d == 1) {
        // Фильм / Сериал
        return `<div class="form-group wide">
          <label>Директор</label>
          <input type="text" name="director" required placeholder="Например: Дюна 2" />
        </div>

        <div class="form-group wide">
          <label>Актеры</label>
          <input type="text" name="actors" required placeholder="Ф.И." />
        </div>

        <div class="form-group wide">
          <label>Время | Минут</label>
          <input type="text" name="durationMinutes" required placeholder="1000" />
        </div>`;
      } else if (d == 2) {
        // Книга
        return `<div class="form-group wide">
          <label>Автор</label>
          <input type="text" name="author" required placeholder="Например: Дюна 2" />
        </div>

        <div class="form-group wide">
          <label>Издатель</label>
          <input type="text" name="publisher" required placeholder="Например: Дюна 2" />
        </div>

        <div class="form-group wide">
          <label>Страницы</label>
          <input type="text" name="pageCount" required placeholder="1000" />
        </div>`;
      } else if (d == 3) {
        // Книга
        return `<div class="form-group wide">
          <label>Платформа</label>
          <input type="text" name="platform" required placeholder="Например: python, nodejs, ..." />
        </div>

        <div class="form-group wide">
          <label>Уровень</label>
          <input type="text" name="level" required placeholder="Например: Начинающий" />
        </div>

        <div class="form-group wide">
          <label>Автор</label>
          <input type="text" name="author" required placeholder="Например: Дюна 2" />
        </div>

        <div class="form-group wide">
          <label>Время | часов</label>
          <input type="text" name="durationHours" required placeholder="1000" />
        </div>`;
      } else return ``;
    },
  };
});
