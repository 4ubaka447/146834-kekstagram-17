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

})();
