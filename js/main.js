'use strict';

// 1. Генерим коммент отдельно
// 2. Генерим массив комментов рандомной длины
// 3. Генерим описание к фото с рандомным количеством комментов

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
var AUTOR_NAME = [
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
]

// начальное и конечное значение диапазона номеров аватарок в базе
var AVATAR_COUNT = [1, 6];

// количество описаний фото для генерации
var PHOTO_DESCRIPTION_COUNT = 25;

// возможное количество комментов к одной фото, начальное и конечное значение диапазона
var COMMENTS_COUNT = [1, 5];

// возможное количество лайков к одной фото, начальное и конечное значение диапазона
var LIKES_COUNT = [15, 200];

// шаблон коммента, нужен чтобы передавать в функцию-генератор 1 объект, а не пачку глобальных переменных
// под это дело бы создать класс. Но мы не делаем ООП, и надо читать как это делать в JS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var COMMENT = {
  avatarImage: AVATAR_COUNT,
  message: COMMENTS_LIST,
  autorName: AUTOR_NAME
}

// шаблон описания, нужен чтобы передавать в функцию-генератор 1 объект, а не пачку глобальных переменных
// под это дело бы создать класс. Но мы не делаем ООП, и надо читать как это делать в JS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// возможно стоит переписать объект так:
// {
//   minAvatarCount: AVATAR_COUNT_MIN
//   maxAvatarCount: AVATAR_COUNT_MAX
//   ......
// }
// и заодно избавится от массивов-диапазонов!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var PHOTO_DESCRIPTION = {
  url: PHOTO_DESCRIPTION_COUNT,
  likes: LIKES_COUNT,
  comments: COMMENT,
  commentCount: COMMENTS_COUNT
}

// вспомогательная функция
// возвращает случайный элемент из массива
var getRandomArrElem = function (arr) {
  var elem = arr[Math.round((Math.random() * (arr.length - 1)))]
  return elem;
}

// вспомогательная функция
// возвращает случайное число в заданном диапазоне
var getRandomNumber = function (min, max) {
  return Math.round((Math.random() * (max - min)) + min);// даст вам неравномерное распределение, тут подойдет, а если надо равномерное?
}

// возвращает случайное имя картинки аватара пользователя, и путь к ней
var getAvatarName = function (startNumber, lastNumber) {
  var avatarName =
    'img/avatar-'
    + getRandomNumber(startNumber, lastNumber)
    + '.svg'

  return avatarName;
}

// генератор одного коммента
var getComment = function (comment) {
  var comment = {
    avatarImage: getAvatarName(comment.avatarImage[0], comment.avatarImage[1]),
    message: getRandomArrElem(comment.message),
    autorName: getRandomArrElem(comment.autorName)
  }

  return comment;
};

// множитель комментов
// возвращает массив комментариев рандомной длины
var getRandomComments = function (comment, min, max) {
  var comments = [];
  var commentsCount = getRandomNumber(min, max);
  for (var i = 0; i < commentsCount; i++) {
    comments[i] = getComment(comment);
  }

  return comments;
}

// генерит заданное количество объектов - описаний к фото
var getPhotoDescription = function (photoDescription) {
  var obj = [];

  for (var i = 0; i < photoDescription.url; i++) {
    obj[i] = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(photoDescription.likes[0], photoDescription.likes[1]),
      comments: getRandomComments(photoDescription.comments, photoDescription.commentCount[0], photoDescription.commentCount[1])
    }
  }

  return obj;
};

// console.log(getPhotoDescription(PHOTO_DESCRIPTION));
