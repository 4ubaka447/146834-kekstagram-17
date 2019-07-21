'use strict';

// Логика отрисовки

(function () {
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

  // функция вставки необходимого количества случайных фото в блок
  // photoDescriptions - массив случайных фото
  // container - блок для вставки фото

  window.picture.insertRandomUserImges = function (photoDescriptions, container) {
    var fragment = document.createDocumentFragment(); // создаем конечный элемент для вставки

    // заполняем элемент
    for (var i = 0; i < photoDescriptions.length; i++) {
      fragment.appendChild(renderRandomUserImg(photoDescriptions[i]));
    }

    container.appendChild(fragment); // вставляем элемент на страницу
  };

})();


