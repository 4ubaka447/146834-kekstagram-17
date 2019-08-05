'use strict';

(function () {

  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  var effectsList = document.querySelector('.effects__list');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, window.popup.closePopup);
  };

  window.popup = {

    closePopup: function () {
      imgUploadForm.reset(); // сбрасываем форму при закрытиии

      imgUploadOverlay.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      document.removeEventListener('change', onPopupEscPress);

      imgUploadPreview.classList = 'img-upload__preview effects__preview--none';
      effectsList.click();
    },

    openPopup: function () {
      imgUploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    },
  };
})();
