'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';

  var SUCCESS_CODE = 200;

  var loadStart = function (xhr, onSuccess, onError) {
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
  };

  window.network = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      loadStart(xhr, onSuccess, onError);
      xhr.open('GET', LOAD_URL);
      xhr.send();
    },

    upload: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      loadStart(xhr, onSuccess, onError);
      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    },
  };

})();


