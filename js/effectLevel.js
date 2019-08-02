'use strict';

// реализация насыщенности эффекта
(function () {

  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');


  // функция изменяет стили для изменения уровня эффекта
  // depthOfEffect глубина эффекта от 0 до 100
  // effectOnImg - наложенный на элемент эффект
  // targetElement - целевой элемент с которым работаем

  var changeStyleLevel = function (depthOfEffect, effectOnImg, targetElement) {
    switch (effectOnImg) {
      case 'effects__preview--chrome':
        targetElement.style.filter = 'grayscale(+' + 0.01 * depthOfEffect + ')'; // 0...1
        break;
      case 'effects__preview--sepia':
        targetElement.style.filter = 'sepia(+' + 0.01 * depthOfEffect + ')'; // 0...1
        break;
      case 'effects__preview--marvin':
        targetElement.style.filter = 'invert(' + depthOfEffect + '%)'; // 0...100
        break;
      case 'effects__preview--phobos':
        targetElement.style.filter = 'blur(+' + 3 / 100 * depthOfEffect + 'px)'; // 0...3
        break;
      case 'effects__preview--heat':
        targetElement.style.filter = 'brightness(+' + ((depthOfEffect * 0.01 * (3 - 1)) + 1) + ')'; // 1...3
        break;
    }
  };

  window.effectLevel = {
    changeEffectLevel: function (evt) {
      // все перемещения слайдера будем считать в процентах,
      // для этого найдем масштбаный коэффициент
      // получим ширину слайдера и соотнесем ее к 100%
      var scaleFactor = effectLevelLine.offsetWidth / 100; // получаем ширину
      var startX = evt.clientX;
      var onMouseMove = function (moveEvt) {

        var shift = (startX - moveEvt.clientX);
        startX = moveEvt.clientX;
        var currentPosition = effectLevelPin.offsetLeft;
        var sliderPosition = (currentPosition - shift) / scaleFactor;

        if (sliderPosition < 0) {
          sliderPosition = 0;
        }

        if (sliderPosition > 100) {
          sliderPosition = 100;
        }

        effectLevelPin.style.left = sliderPosition + '%';
        effectLevelDepth.style.width = sliderPosition + '%';
        effectLevelValue.value = Math.round(sliderPosition); // округляем для сервера

        changeStyleLevel(sliderPosition, imgUploadPreview.classList.item(1), imgUploadPreview);
      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
  };
})();
