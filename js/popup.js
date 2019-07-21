'use strict';

(function () {

  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, window.popup.closePopup);
  };

  window.popup = {

    closePopup: function () {
      imgUploadForm.reset(); // сбрасываем форму при закрытиии
      imgUploadOverlay.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      document.removeEventListener('change', onPopupEscPress);
    },

    openPopup: function () {
      imgUploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    },
  };
})();
