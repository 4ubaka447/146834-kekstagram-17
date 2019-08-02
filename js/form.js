'use strict';

(function () {

  var imgUpload = document.querySelector('.img-upload'); // все элементы для редактирования лежат здесь
  var uploadFile = imgUpload.querySelector('#upload-file');
  var uploadCancel = imgUpload.querySelector('#upload-cancel');
  var scale = imgUpload.querySelector('.scale');
  var effectsList = imgUpload.querySelector('.effects__list');
  var effectLevelPin = imgUpload.querySelector('.effect-level__pin');

  // открываем попап
  uploadFile.addEventListener('change', window.popup.openPopup);

  // закрываем попап
  uploadCancel.addEventListener('click', window.popup.closePopup);

  // меняем масштаб
  scale.addEventListener('click', window.scale.onScaleControlClick);

  // меняем эффект
  effectsList.addEventListener('click', window.changeEffects.onEffectsItemClick);

  // меняем уровень эффекта
  effectLevelPin.addEventListener('mousedown', window.effectLevel.changeEffectLevel);


  // ////////////////////////////////////////////////////

  var imgUploadForm = document.querySelector('.img-upload__form'); // общая форма
  var inputHashtag = imgUploadForm.querySelector('.text__hashtags'); // поле ввода хеш-тегов
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');

  // получаем шаблон с сообщением об ошибке
  var errorTemplate = document.querySelector('#error') // шаблон
    .content
    .querySelector('.error'); // содержимое шаблона

  // получаем шаблон с сообщением об успешной отправке
  var successTemplate = document.querySelector('#success') // шаблон
    .content
    .querySelector('.success'); // содержимое шаблона


  var showMessage = function (template) {
    var message = template.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(message);
    document.querySelector('main').appendChild(fragment);
  };

  var uploadSuccess = function () {
    imgUploadOverlay.classList.add('hidden');
    showMessage(successTemplate);
  };

  var uploadError = function () {
    imgUploadOverlay.classList.add('hidden');
    showMessage(errorTemplate);
  };

  // функция обработки ввода в поле с хеш-тегами
  // сбрасывает значение в поле ввода
  var onInputInput = function () {
    inputHashtag.setCustomValidity('');
  };

  var onSubmitButtonClick = function (evt) {
    if (window.validateHashtags(inputHashtag.value)) {

      window.upload(new FormData(imgUploadForm), uploadSuccess, uploadError);
      evt.preventDefault();

    } else {
      evt.preventDefault();
    }
  };

  imgUploadForm.addEventListener('submit', onSubmitButtonClick);
  inputHashtag.addEventListener('input', onInputInput);

})();
