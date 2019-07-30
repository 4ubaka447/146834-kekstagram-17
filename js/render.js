'use strict';

// Логика отрисовки

(function () {

  var randomUserImgContainer = document.querySelector('.pictures'); // получаем блок для вставки случайных фото

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

  var clear = function () {
    while (randomUserImgContainer.querySelector('.picture')) {
      randomUserImgContainer
        .removeChild(randomUserImgContainer.querySelector('.picture'));
    }
  };

  // функция вставляет необходимое количество случайных фото в блок
  // photoDescriptions - массив случайных фото
  // quantity - количество фото для отрисовки
  window.render = function (photoDescriptions, quantity) {

    clear();

    var fragment = document.createDocumentFragment();

    // цикл пробегает весь массив, при необходимости длину можно уменьшить
    for (var i = 0; i < quantity; i++) {
      fragment.appendChild(renderRandomUserImg(photoDescriptions[i]));
    }

    randomUserImgContainer.appendChild(fragment);
  };

})();


