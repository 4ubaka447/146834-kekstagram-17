'use strict';

// не знаю куда приткнуть эту штуку, используется много где, и в разных модулях
window.imgUpload = document.querySelector('.img-upload'); // все элементы для редактирования лежат здесь

window.util = (function () {

  var ESC_KEYCODE = 27;

  var textDescription = window.imgUpload.querySelector('.text__description');
  return {
    // возвращает случайный элемент из массива
    getRandomArrElem: function (arr) {
      var elem = arr[Math.round((Math.random() * (arr.length - 1)))];
      return elem;
    },
    // возвращает случайное число в заданном диапазоне
    getRandomNumber: function (min, max) {
      return Math.round((Math.random() * (max - min)) + min);// даст вам неравномерное распределение, тут подойдет, а если надо равномерное?
    },
    // обрабатывает нажатие Esc
    isEscEvent: function (evt, action) {
      // сработает при нажатии ESC и если фокус не находится в поле ввода комментария
      if (evt.keyCode === ESC_KEYCODE && textDescription !== document.activeElement) {
        action();
      }
    },
  };
})();
