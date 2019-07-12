'use strict';

(function () {
  var UPLOADED_IMG_DEFAULT_CLASS = 'img-upload__preview';
  var DEFAULT_EFFECT_LEVEL = 100;


  var imgUploadForm = window.imgUpload.querySelector('.img-upload__form');
  var imgUploadOverlay = window.imgUpload.querySelector('.img-upload__overlay');
  var uploadFile = window.imgUpload.querySelector('#upload-file');
  var uploadCancel = window.imgUpload.querySelector('#upload-cancel');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var closePopup = function () {
    imgUploadForm.reset(); // сбрасываем форму при закрытиии
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };


  uploadFile.addEventListener('change', openPopup);
  uploadCancel.addEventListener('click', closePopup);


  // реализация масштабирования

  var SCALE = {
    SCALE_VALUE_DEFAULT: 1,
    SCALE_STEP: 0.25,
    LIMIT_SCALE_VALUES: [0.25, 1]
  };

  var scaleControlSmaller = window.imgUpload.querySelector('.scale__control--smaller');
  var scaleControlBigger = window.imgUpload.querySelector('.scale__control--bigger');
  var scaleControlValue = window.imgUpload.querySelector('.scale__control--value');
  var scale = window.imgUpload.querySelector('.scale');

  var imgUploadPreview = window.imgUpload.querySelector('.img-upload__preview');
  var effectsList = window.imgUpload.querySelector('.effects__list');

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

  // использует глобальные переменные, по возможности надо переписать
  var onScaleControlClick = function (evt) {
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
  };

  scale.addEventListener('click', onScaleControlClick);


  // реализация смены эффектов

  var effectLevel = window.imgUpload.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');

  // функция сброса уровня эффекта, на уровень по умолчанию
  var resetEffectLevel = function (defaultEffectLevel) {
    effectLevelPin.style.left = defaultEffectLevel + '%';
    effectLevelDepth.style.width = defaultEffectLevel + '%';
  };

  resetEffectLevel(DEFAULT_EFFECT_LEVEL);

  // функция добавляет целевому элементу задаваемый класс
  // elemTarget - целевой элемент
  // extraClass - задаваемый класс
  var addElemntEffect = function (elemTarget, extraClass) {
    elemTarget.classList = ''; // обнуляем класс лист
    elemTarget.classList.add(UPLOADED_IMG_DEFAULT_CLASS); // добавляем класс по умолчанию
    elemTarget.classList.add(extraClass); // добавляем заданный класс
  };

  // функция обработчик
  var onEffectsItemClick = function (evt) {

    effectLevel.classList.remove('visually-hidden'); // показываем слайдер, который скрываем если фото без эффекта

    if (evt.target.classList.contains('effects__preview')) {
      var extraClass = evt.target.classList.item(1); // забираем нужный класс у элемента по которому кликаем
      addElemntEffect(imgUploadPreview, extraClass);
      resetEffectLevel(DEFAULT_EFFECT_LEVEL);
    }

    // если выбрали фото без эффекта, скроем слайдер
    if (imgUploadPreview.classList.contains('effects__preview--none')) {
      effectLevel.classList.add('visually-hidden');
    }

    imgUploadPreview.style.filter = ''; // при каждом переключении сбрасываем фильтр на фото
  };

  effectsList.addEventListener('click', onEffectsItemClick);


  // реализация насыщенности эффекта

  // функция изменяет стили для изменения уровня эффекта
  // depthOfEffect глубина эффекта от 0 до 100
  // effectOnImg - наложенный на элемент эффект
  // targetElement - целевой элемент с которым работаем

  var changeEffectLevel = function (depthOfEffect, effectOnImg, targetElement) {
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


  effectLevelPin.addEventListener('mousedown', function (evt) {
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
      effectLevelValue.value = sliderPosition;

      changeEffectLevel(sliderPosition, imgUploadPreview.classList.item(1), imgUploadPreview);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
