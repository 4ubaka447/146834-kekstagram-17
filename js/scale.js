'use strict';

// реализация масштабирования
(function () {

  var Scale = {
    VALUE_DEFAULT: 1,
    STEP: 0.25,
    LIMIT_VALUES: [0.25, 1]
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

  setScaleControlValue(Scale.VALUE_DEFAULT); // устанавливаем значение масштаба по умолчанию

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
        Scale.VALUE_DEFAULT =
          scaleDown(Scale.VALUE_DEFAULT, Scale.STEP, Scale.LIMIT_VALUES);

      }

      if (target === scaleControlBigger) {
        Scale.VALUE_DEFAULT =
          scaleUp(Scale.VALUE_DEFAULT, Scale.STEP, Scale.LIMIT_VALUES);
      }

      setScaleControlValue(Scale.VALUE_DEFAULT);
    },
  };

})();
