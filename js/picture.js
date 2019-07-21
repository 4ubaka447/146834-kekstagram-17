'use strict';

// Логика отрисовки

(function () {
  var randomUserImgContainer = document.querySelector('.pictures'); // получаем блок для вставки случайных фото
  var stub = window.data.photoDescription; // получаем заглушку из моков, на случай ошибки

  var imgFilters = document.querySelector('.img-filters'); // получаем доступ к блоку фильтров случайных фото
  imgFilters.classList.remove('img-filters--inactive'); // убираем модификатор inactive - начинаем показывать на странице

  // получаем шаблон случайного фото
  var randomUserImgTemplate = document.querySelector('#picture') // шаблон
    .content
    .querySelector('.picture'); // содержимое шаблона

  // функция создания одного случайного фото
  // принимает один объект-описание
  var renderRandomUserImg = function (photoDescription) {
    var randomUserImg = randomUserImgTemplate.cloneNode(true);

    randomUserImg.querySelector('.picture__img').src = photoDescription.url;
    randomUserImg.querySelector('.picture__likes').textContent = photoDescription.likes;
    randomUserImg.querySelector('.picture__comments').textContent = photoDescription.comments.length;

    return randomUserImg;
  };

  // функция вставляет необходимое количество случайных фото в блок
  // photoDescriptions - массив случайных фото
  var successHandler = function (photoDescriptions) {
    var fragment = document.createDocumentFragment();

    // цикл пробегает весь массив, при необходимости длину можно уменьшить
    for (var i = 0; i < photoDescriptions.length; i++) {
      fragment.appendChild(renderRandomUserImg(photoDescriptions[i]));
    }

    randomUserImgContainer.appendChild(fragment);
  };

  // вызывает функцию вставки, но с моками
  var errorHandler = function () {
    successHandler(stub);
  };


  window.picture = function () {
    window.load(successHandler, errorHandler);
  };

})();


