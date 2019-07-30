'use strict';

// пока не реализован
(function () {

  var COMMENT_TOTAL = 5;

  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialCaption = bigPicture.querySelector('.social__caption');

  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var clearCommentList = function () {
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
  };

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

  window.preview = function (data) {

    document.querySelector('body').classList.add('modal-open');

    var i = 0;
    bigPictureImg.src = data[i].url;
    likesCount.textContent = data[i].likes;
    commentsCount.textContent = data[i].comments.length;
    socialCaption.textContent = data[i].description;

    clearCommentList();
    getCommentsItem(data[i].comments);

    socialCommentCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
  };

})();
