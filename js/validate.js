'use strict';

(function () {

  var Heshtag = {
    START_POSITION: 0,
    MAX_COUNT: 5,
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    VALID_POSITION: 1
  };

  var ErrorMessage = {
    START: 'Хэш-тег должен начинаться с символа #',
    MIN_LENGTH: 'Хеш-тег не может состоять только из одной решётки',
    MAX_LENGTH: 'Максимальная длина одного хэш-тега ' + Heshtag.MAX_LENGTH + ' cимволов, включая решётку',
    NO_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
    MAX_NUMBER: 'Хэштегов может быть максимум ',
    SEPARATOR: 'Хэш-теги разделяются пробелами'
  };

  var inputHashtag = document.querySelector('.text__hashtags'); // поле ввода хеш-тегов

  // функция проверки одного хеш-тега
  window.validateHashtags = function (hashtags) {

    var hashtagsArray = hashtags
      .toLowerCase() // теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом
      .split(' '); // получаем массив хеш-тегов

    if (hashtagsArray[0] !== '') {

      if (hashtagsArray.length > 5) {
        inputHashtag.setCustomValidity(ErrorMessage.MAX_NUMBER + Heshtag.MAX_COUNT);
        return false;
      }

      for (var i = 0; i < hashtagsArray.length; i++) {
        if (hashtagsArray[i][hashtagsArray[i].length - 1] === ',') {
          hashtagsArray[i] = hashtagsArray[i].substring(0, hashtagsArray[i].length - 1);
        }

        if (hashtagsArray.indexOf(hashtagsArray[i], i + 1) > 0) { // один и тот же хэш-тег не может быть использован дважды
          inputHashtag.setCustomValidity(ErrorMessage.NO_REPEAT);
          return false;
        }

        if (hashtagsArray[i][Heshtag.START_POSITION] !== '#') { // хэш-тег начинается с символа # (решётка)
          inputHashtag.setCustomValidity(ErrorMessage.START);
          return false;
        }

        if (hashtagsArray[i].length < Heshtag.MIN_LENGTH) { // хеш-тег не может состоять только из одной решётки
          inputHashtag.setCustomValidity(ErrorMessage.MIN_LENGTH);
          return false;
        }

        if (hashtagsArray[i].length > Heshtag.MAX_LENGTH) { // максимальная длина одного хэш-тега 20 символов, включая решётку
          inputHashtag.setCustomValidity(ErrorMessage.MAX_LENGTH);
          return false;
        }

        if (hashtagsArray[i].indexOf('#', Heshtag.VALID_POSITION) > 0) { // хэш-теги разделяются пробелами
          inputHashtag.setCustomValidity(ErrorMessage.SEPARATOR);
          return false;
        }
      }
    }

    return true;
  };

})();
