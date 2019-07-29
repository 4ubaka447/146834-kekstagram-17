'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var SUCCESS_CODE = 200;

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = 10000; // 10 s

    xhr.open('GET', URL);
    xhr.send();
  };

})();


