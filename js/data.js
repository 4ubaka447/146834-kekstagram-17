'use strict';

// 1. Генерим коммент отдельно
// 2. Генерим массив комментов рандомной длины
// 3. Генерим описание к фото с рандомным количеством комментов

(function () {

  // произвольные комменты, моки
  var COMMENTS_LIST = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  // произвольные имена авторов комментов, моки
  var AUTHORS_NAMES = [
    'Артем',
    'Юля',
    'Данил',
    'Дима',
    'Лена',
    'Катя',
    'Никита',
    'Юра',
    'Андрей',
    'Женя'
  ];

  // начальное и конечное значение диапазона номеров аватарок в базе
  var AvatarCount = {
    MIN: 1,
    MAX: 6,
  };

  // количество описаний фото для генерации
  var PHOTO_DESCRIPTION_COUNT = 25;

  // возможное количество комментов к одной фото, начальное и конечное значение диапазона
  var NumberOfComments = {
    MIN: 1,
    MAX: 5,
  };

  // возможное количество лайков к одной фото, начальное и конечное значение диапазона
  var LikesCount = {
    MIN: 15,
    MAX: 200,
  };

  // шаблон коммента, нужен чтобы передавать в функцию-генератор 1 объект, а не пачку глобальных переменных
  var commentTemplate = {
    avatarImage: AvatarCount,
    message: COMMENTS_LIST,
    autorName: AUTHORS_NAMES
  };

  var photoDescription = {
    url: PHOTO_DESCRIPTION_COUNT,
    likes: LikesCount,
    comments: commentTemplate,
    commentCount: NumberOfComments,
  };

  // возвращает случайное имя картинки аватара пользователя, и путь к ней
  var getAvatarName = function (startNumber, lastNumber) {
    return 'img/avatar-' + window.util.getRandomNumber(startNumber, lastNumber) + '.svg';
  };

  // генератор одного коммента
  var getComment = function (comment) {
    return {
      avatarImage: getAvatarName(comment.avatarImage.MIN, comment.avatarImage.MAX),
      message: window.util.getRandomArrElem(comment.message),
      autorName: window.util.getRandomArrElem(comment.autorName)
    };
  };

  // множитель комментов
  // возвращает массив комментариев рандомной длины
  var getRandomComments = function (comment, min, max) {
    var comments = [];
    var commentsCount = window.util.getRandomNumber(min, max);
    for (var i = 0; i < commentsCount; i++) {
      comments[i] = getComment(comment);
    }

    return comments;
  };

  // генерит заданное количество объектов - описаний к фото
  var getPhotoDescription = function (photoCaptions) {
    var obj = [];

    for (var i = 0; i < photoCaptions.url; i++) {
      obj[i] = {
        url: 'photos/' + (i + 1) + '.jpg', // +1 нужен потому, что фото 0 нет, они идут как 1, 2, 3...
        likes: window.util.getRandomNumber(photoCaptions.likes.MIN, photoCaptions.likes.MAX),
        comments: getRandomComments(photoCaptions.comments, photoCaptions.commentCount.MIN, photoCaptions.commentCount.MAX),
      };
    }

    return obj;
  };

  window.data = {
    photoDescription: getPhotoDescription(photoDescription),
  };

})();
