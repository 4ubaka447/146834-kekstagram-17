'use strict';

(function () {

  var NEW_ELEMENTS_COUNT = 10;
  var ENTER_KEYCODE = 13;

  var imgFilters = document.querySelector('.img-filters'); // получаем доступ к блоку фильтров случайных фото
  var imgFiltersButtons = imgFilters.querySelectorAll('.img-filters__button'); // получаем псевдомассив кнопок фильтра

  // кнопки фильтра
  var filterPopular = imgFilters.querySelector('#filter-popular');
  var filterNew = imgFilters.querySelector('#filter-new');
  var filterDiscussed = imgFilters.querySelector('#filter-discussed');

  var picturesContainer = document.querySelector('.pictures');

  var pictures = [];

  // функция подсвечивает кнопку
  var activeFiltersButton = function (elem) {
    imgFiltersButtons.forEach(function (it) {
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

  var onPicturesClick = function (evt) {

    if (evt.target.classList.contains('picture__img')) {
      window.showBigPhoto(evt.target.src, pictures);
    }

    if (evt.target.classList.contains('picture')) {
      window.showBigPhoto(evt.target.firstElementChild.src, pictures);
    }
  };

  var onPicturesPressEnter = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onPicturesClick(evt);
    }
  };

  var successHandler = function (data) {
    pictures = data;

    window.render(pictures);
    imgFilters.classList.remove('img-filters--inactive'); // убираем модификатор inactive - начинаем показывать на странице

    filterPopular.addEventListener('click', onFilterPopularClick);
    filterNew.addEventListener('click', onFilterNewClick);
    filterDiscussed.addEventListener('click', onFilterDiscussedClick);


    picturesContainer.addEventListener('click', onPicturesClick);
    picturesContainer.addEventListener('keydown', onPicturesPressEnter);
  };

  // заглушка
  var errorHandler = function () {
    var div = document.createElement('div');
    div.textContent = 'Ошибка загрузки!';
    div.style.fontSize = '100px';
    div.style.color = 'red';
    div.style.position = 'absolute';
    div.style.top = '50%';
    div.style.left = '25%';
    document.querySelector('main').appendChild(div);
  };

  window.network.load(successHandler, errorHandler);

})();


