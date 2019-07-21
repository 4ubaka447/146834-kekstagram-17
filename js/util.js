'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var textDescription = document.querySelector('.text__description');

  window.util = {
    // возвращает случайный элемент из массива
    getRandomArrElem: function (arr) {
      return arr[Math.round((Math.random() * (arr.length - 1)))];
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
