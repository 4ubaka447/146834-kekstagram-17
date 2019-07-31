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

  // функция подсвечивает кнопку
  var activeFiltersButton = function (elem) {
    imgFiltersButton.forEach(function (it) {
      it.classList.remove('img-filters__button--active');
    });

    elem.classList.add('img-filters__button--active');
  };

  // сортировка по популярности
  // отрисовывает наиболее популярные фото
  // в данном случае отрисовывает в первоначальном порядке
  var sortPopular = function () {
    window.render(pictures);
  };

  // сортировка по новым фото
  var sortNew = function () {
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

    window.render(newArrayOfPictures);
  };

  // сортировка по обсуждаемым фото
  var sortDiscussed = function () {
    window.render(
        pictures
          .slice()
          .sort(function (a, b) {
            return a.comments.length - b.comments.length;
          })
          .reverse());
  };

  var onFilterPopularClick = function () {
    activeFiltersButton(filterPopular);
    window.debounce(sortPopular);
  };

  var onFilterNewClick = function () {
    activeFiltersButton(filterNew);
    window.debounce(sortNew);
  };

  var onFilterDiscussedClick = function () {
    activeFiltersButton(filterDiscussed);
    window.debounce(sortDiscussed);
  };

  var successHandler = function (data) {
    pictures = data;
    console.log(pictures);

    window.render(pictures);
    imgFilters.classList.remove('img-filters--inactive'); // убираем модификатор inactive - начинаем показывать на странице

    filterPopular.addEventListener('click', onFilterPopularClick);
    filterNew.addEventListener('click', onFilterNewClick);
    filterDiscussed.addEventListener('click', onFilterDiscussedClick);


    document.querySelector('.pictures').addEventListener('click', function (evt) {

      var tempA = evt.target.src.split('.'); // jpg
      var tempB = tempA[0].split('/'); // разбиваем на массив, в последней ячейке которого лежит номер фото
      var photoNumber = tempB[tempB.length - 1]; // номер фото

      window.preview(evt, pictures[photoNumber - 1]); // номер в массив
    });
  };

  // вызывает функцию вставки, но с моками
  var errorHandler = function () {
    successHandler(stub);
  };

  window.load(successHandler, errorHandler);

})();


