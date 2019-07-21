'use strict';

// реализация масштабирования
(function () {

  var SCALE = {
    SCALE_VALUE_DEFAULT: 1,
    SCALE_STEP: 0.25,
    LIMIT_SCALE_VALUES: [0.25, 1]
  };

  var imgUpload = document.querySelector('.img-upload'); // все элементы для редактирования лежат здесь
  var scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');
  var scaleControlValue = imgUpload.querySelector('.scale__control--value');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');


  // функция устанавливает значение масштаба
  var setScaleControlValue = function (value) {
    scaleControlValue.value = value * 100 + '%';
    imgUploadPreview.style.transform = 'scale(' + value + ')';
  };

  setScaleControlValue(SCALE.SCALE_VALUE_DEFAULT); // устанавливаем значение масштаба по умолчанию

  // функция увеличивает масштаб изображения
  var scaleUp = function (scaleValue, scaleStep, limitScaleValues) {
    if (scaleValue !== limitScaleValues[1]) {
      scaleValue = scaleValue + scaleStep;
    }

    return scaleValue;
  };

  // функция уменьшает масштаб изображения
  var scaleDown = function (scaleValue, scaleStep, limitScaleValues) {
    if (scaleValue !== limitScaleValues[0]) {
      scaleValue = scaleValue - scaleStep;
    }

    return scaleValue;
  };

  window.scale = {
    onScaleControlClick: function (evt) {
      var target = evt.target;

      if (target === scaleControlSmaller) {
        SCALE.SCALE_VALUE_DEFAULT =
          scaleDown(SCALE.SCALE_VALUE_DEFAULT, SCALE.SCALE_STEP, SCALE.LIMIT_SCALE_VALUES);

      }

      if (target === scaleControlBigger) {
        SCALE.SCALE_VALUE_DEFAULT =
          scaleUp(SCALE.SCALE_VALUE_DEFAULT, SCALE.SCALE_STEP, SCALE.LIMIT_SCALE_VALUES);
      }

      setScaleControlValue(SCALE.SCALE_VALUE_DEFAULT);
    },
  };

})();
