'use strict';

// пока не реализован
(function () {

  var COMMENT_TOTAL = 5;

  var bigPicture = document.querySelector('.big-picture'); // блок с "большой" фоторафией

  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel'); // крестик

  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialCaption = bigPicture.querySelector('.social__caption');

  var commentsCountLoaded = bigPicture.querySelector('.comments-count__loaded');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var body = document.querySelector('body');

  // функция очистки списка комментариев
  var clearCommentList = function () {
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
  };

  // функция заполнения списка комментариев
  var getCommentsItem = function (comments) {
    var commentsNumber = comments.length > COMMENT_TOTAL ? COMMENT_TOTAL : comments.length;

    for (var i = 0; i < commentsNumber; i++) {
      var item = document.createElement('li');
      item.classList = 'social__comment social__comment--text';

      var avatarImg = document.createElement('img');
      avatarImg.classList = 'social__picture';
      avatarImg.src = comments[i].avatar;
      avatarImg.width = '35';
      avatarImg.height = '35';
      avatarImg.alt = 'Аватар комментатора фотографии';

      var p = document.createElement('p');
      p.classList = 'social__text';
      p.textContent = comments[i].message;

      item.appendChild(avatarImg);
      item.appendChild(p);
      socialComments.appendChild(item);
    }
  };

  var onKeydownEsc = function (evt) {
    window.util.isEscEvent(evt, closePost);
  };

  var closePost = function () {
    bigPicture.classList.add('hidden');
    bigPictureCancel.removeEventListener('click', closePost);
    document.removeEventListener('keydown', onKeydownEsc);
    body.classList.remove('modal-open');
  };

  var openPost = function () {
    bigPictureCancel.addEventListener('click', closePost);
    document.addEventListener('keydown', onKeydownEsc);
  };

  var showBigPicture = function (item) {

    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    commentsLoader.classList.remove('visually-hidden');

    bigPictureImg.src = item.url;
    likesCount.textContent = item.likes;
    commentsCountLoaded.textContent = COMMENT_TOTAL;
    commentsCount.textContent = item.comments.length;
    socialCaption.textContent = item.description;

    if (item.comments.length < COMMENT_TOTAL) {
      commentsCountLoaded.textContent = item.comments.length;
      commentsLoader.classList.add('visually-hidden');
    }

    clearCommentList();
    getCommentsItem(item.comments);
    openPost();
  };

  window.preview = {
    showBigPicture: function (item) {
      showBigPicture(item);
    },

    showMoreComments: function (comments) {
      getCommentsItem(comments);
    },
  };

})();
