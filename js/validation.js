'use strict';

(function () {

  var imgUploadForm = document.querySelector('.img-upload__form'); // общая форма
  var inputHashtag = imgUploadForm.querySelector('.text__hashtags'); // поле ввода хеш-тегов
  var submitButton = imgUploadForm.querySelector('#upload-submit'); // кнопка отправки формы

  var hestagData = {
    START_POSITION: 0,
    MAX_COUNT: 5,
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    VALID_POSITION: 1
  };

  var ErrorMessage = {
    START: 'Хэш-тег должен начинаться с символа #',
    MIN_LENGTH: 'Хеш-тег не может состоять только из одной решётки',
    MAX_LENGTH: 'Максимальная длина одного хэш-тега ' + hestagData.MAX_LENGTH + ' cимволов, включая решётку',
    NO_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
    MAX_NUMBER: 'Хэштегов может быть максимум ',
    SEPARATOR: 'Хэш-теги разделяются пробелами'
  };

  // функция проверки одного хеш-тега
  var validateHashtag = function (hashtag) {
    if (hashtag[hestagData.START_POSITION] !== '#') { // хэш-тег начинается с символа # (решётка)
      inputHashtag.setCustomValidity(ErrorMessage.START);
      return false;
    } else if (hashtag.length < hestagData.MIN_LENGTH) { // хеш-тег не может состоять только из одной решётки
      inputHashtag.setCustomValidity(ErrorMessage.MIN_LENGTH);
      return false;
    } else if (hashtag.length > hestagData.MAX_LENGTH) { // максимальная длина одного хэш-тега 20 символов, включая решётку
      inputHashtag.setCustomValidity(ErrorMessage.MAX_LENGTH);
      return false;
    } else if (hashtag.indexOf('#', hestagData.VALID_POSITION) > 0) { // хэш-теги разделяются пробелами
      inputHashtag.setCustomValidity(ErrorMessage.SEPARATOR);
      return false;
    }
    return true;
  };

  // функция проверки хеш-тегов
  var validateHashtagsArray = function (hashtags) {

    var hashtagsArray = hashtags
      .toLowerCase() // теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом
      .split(' '); // получаем массив хеш-тегов

    if (hashtagsArray.length > hestagData.MAX_COUNT) { // нельзя указать больше пяти хэш-тегов
      inputHashtag.setCustomValidity(ErrorMessage.MAX_NUMBER + hestagData.MAX_COUNT);
      return false;
    }

    for (var i = 0; i < hashtagsArray.length; i++) {
      if (!validateHashtag(hashtagsArray[i])) {
        return false;
      } else if (hashtagsArray.indexOf(hashtagsArray[i], i + 1) > 0) { // один и тот же хэш-тег не может быть использован дважды
        inputHashtag.setCustomValidity(ErrorMessage.NO_REPEAT);
        return false;
      }
    }

    return true;
  };


  var onSubmitButtonClick = function () {
    if (inputHashtag.value !== '') {
      validateHashtagsArray(inputHashtag.value);
    }
  };

  // функция обработки ввода в поле с хеш-тегами
  // сбрасывает значение в поле ввода
  var onInputInput = function () {
    inputHashtag.setCustomValidity('');
  };

  submitButton.addEventListener('click', onSubmitButtonClick);
  inputHashtag.addEventListener('input', onInputInput);

})();
