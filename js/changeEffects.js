'use strict';

// реализация смены эффектов
(function () {
  var UPLOADED_IMG_DEFAULT_CLASS = 'img-upload__preview';
  var DEFAULT_EFFECT_LEVEL = 100;

  var effectLevel = document.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');

  var imgUploadPreview = document.querySelector('.img-upload__preview');


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

  window.changeEffects = {
    // функция обработчик
    onEffectsItemClick: function (evt) {

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
    },
  };
})();
