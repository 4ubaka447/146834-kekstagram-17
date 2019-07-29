'use strict';

(function () {

  var NEW_ELEMENTS_COUNT = 10;

  var stub = window.data.photoDescription; // получаем заглушку из мок, на случай ошибки

  var imgFilters = document.querySelector('.img-filters'); // получаем доступ к блоку фильтров случайных фото
  var imgFiltersButton = imgFilters.querySelectorAll('.img-filters__button'); // получаем псевдомассив кнопок фильтра

  // кнопки фильтра
  var filterPopular = imgFilters.querySelector('#filter-popular');
  var filterNew = imgFilters.querySelector('#filter-new');
  var filterDiscussed = imgFilters.querySelector('#filter-discussed');

  var pictures = [];

  // функция подсвечивает кнопку и чистит поле для рендеринга
  var activeFiltersButton = function (elem) {
    imgFiltersButton.forEach(function (it) {
      it.classList.remove('img-filters__button--active');
    });

    elem.classList.add('img-filters__button--active');

    window.render.clear();
  };

  var onFilterPopularClick = function () {
    activeFiltersButton(filterPopular);
    window.render.draw(pictures, pictures.length);
  };

  var onFilterNewClick = function () {
    activeFiltersButton(filterNew);

    var newArrayOfPictures = [];

    for (var i = 0; newArrayOfPictures.length < NEW_ELEMENTS_COUNT; i++) {
      var elem = window.util.getRandomArrElem(pictures); // получаем случайный элемент из исходного массива

      var urlsArray = newArrayOfPictures.map(function (it) {
        return it.url;
      });

      if (urlsArray.indexOf(elem.url) === -1) {
        newArrayOfPictures.push(elem);
      }
    }
    window.render.draw(newArrayOfPictures, newArrayOfPictures.length);
  };

  var onFilterDiscussedClick = function () {
    activeFiltersButton(filterDiscussed);

    window.render.draw(
        pictures
          .slice()
          .sort(function (a, b) {
            return a.comments.length - b.comments.length;
          })
          .reverse(),

        pictures.length);
  };

  var successHandler = function (data) {
    pictures = data;
    window.render.draw(pictures, pictures.length);
    imgFilters.classList.remove('img-filters--inactive'); // убираем модификатор inactive - начинаем показывать на странице

    filterPopular.addEventListener('click', onFilterPopularClick);
    filterNew.addEventListener('click', onFilterNewClick);
    filterDiscussed.addEventListener('click', onFilterDiscussedClick);
  };

  // вызывает функцию вставки, но с моками
  var errorHandler = function () {
    successHandler(stub);
  };

  window.picture = function () {
    window.load(successHandler, errorHandler);
  };

})();


