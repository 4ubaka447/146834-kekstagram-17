'use strict';

// 1. Генерим коммент отдельно
// 2. Генерим массив комментов рандомной длины
// 3. Генерим описание к фото с рандомным количеством комментов

var imgFilters = document.querySelector('.img-filters'); // получаем доступ к блоку фильтров случайных фото
imgFilters.classList.remove('img-filters--inactive'); // убираем модификатор inactive - начинаем показывать на странице

var randomUserImgContainer = document.querySelector('.pictures'); // получаем блок для вставки случайных фото

// получаем шаблон случайного фото
var randomUserImgTemplate = document.querySelector('#picture') // шаблон
  .content
  .querySelector('.picture'); // содержимое шаблона

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
];

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
};

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
};

// вспомогательная функция
// возвращает случайный элемент из массива
var getRandomArrElem = function (arr) {
  var elem = arr[Math.round((Math.random() * (arr.length - 1)))];
  return elem;
};

// вспомогательная функция
// возвращает случайное число в заданном диапазоне
var getRandomNumber = function (min, max) {
  return Math.round((Math.random() * (max - min)) + min);// даст вам неравномерное распределение, тут подойдет, а если надо равномерное?
};

// возвращает случайное имя картинки аватара пользователя, и путь к ней
var getAvatarName = function (startNumber, lastNumber) {
  var avatarName =
    'img/avatar-'
    + getRandomNumber(startNumber, lastNumber)
    + '.svg';

  return avatarName;
};

// генератор одного коммента
var getComment = function (comment) {
  comment = {
    avatarImage: getAvatarName(comment.avatarImage[0], comment.avatarImage[1]),
    message: getRandomArrElem(comment.message),
    autorName: getRandomArrElem(comment.autorName)
  };

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
};

// генерит заданное количество объектов - описаний к фото
var getPhotoDescription = function (photoDescription) {
  var obj = [];

  for (var i = 0; i < photoDescription.url; i++) {
    obj[i] = {
      url: 'photos/' + (i + 1) + '.jpg', // +1 нужен потому, что фото 0 нет, они идут как 1, 2, 3...
      likes: getRandomNumber(photoDescription.likes[0], photoDescription.likes[1]),
      comments: getRandomComments(photoDescription.comments, photoDescription.commentCount[0], photoDescription.commentCount[1])
    };
  }

  return obj;
};

// Логика отрисовки

// функция создания одного случайного фото
// принимает один объект-описание
var renderRandomUserImg = function (photoDescription) {
  var randomUserImg = randomUserImgTemplate.cloneNode(true);

  randomUserImg.querySelector('.picture__img').src = photoDescription.url;
  randomUserImg.querySelector('.picture__likes').textContent = photoDescription.likes;
  randomUserImg.querySelector('.picture__comments').textContent = photoDescription.comments.length;

  return randomUserImg;
};

// функция вставки необходимого количества случайных фото в блок
// photoDescriptions - массив случайных фото
// container - блок для вставки фото
var insertRandomUserImges = function (photoDescriptions, container) {
  var fragment = document.createDocumentFragment(); // создаем конечный элемент для вставки

  // заполняем элемент
  for (var i = 0; i < photoDescriptions.length; i++) {
    fragment.appendChild(renderRandomUserImg(photoDescriptions[i]));
  }

  container.appendChild(fragment); // вставляем элемент на страницу
};

// Реализация

// создаем массив описаний
var photoDescriptions = getPhotoDescription(PHOTO_DESCRIPTION);
insertRandomUserImges(photoDescriptions, randomUserImgContainer);


// module4-task1

var ESC_KEYCODE = 27;
var UPLOADED_IMG_DEFAULT_CLASS = 'img-upload__preview';
var DEFAULT_EFFECT_LEVEL = 100;

var imgUpload = document.querySelector('.img-upload'); // все элементы для редактирования лежат здесь
var imgUploadForm = imgUpload.querySelector('.img-upload__form');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
var uploadFile = imgUpload.querySelector('#upload-file');
var uploadCancel = imgUpload.querySelector('#upload-cancel');


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  imgUploadForm.reset(); // сбрасываем форму при закрытиии
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var openPopup = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};


uploadFile.addEventListener('change', openPopup);
uploadCancel.addEventListener('click', closePopup);


// реализация насыщенности эффекта

var effectLevel = imgUpload.querySelector('.effect-level');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');
// var effectLevelValue = effectLevel.querySelector('.effect-level__value');

// функция сброса уровня эффекта, на уровень по умолчанию
var resetEffectLevel = function (defaultEffectLevel) {
  effectLevelPin.style.left = defaultEffectLevel + '%';
  effectLevelDepth.style.width = defaultEffectLevel + '%';
};

resetEffectLevel(DEFAULT_EFFECT_LEVEL);


effectLevelPin.addEventListener('mousedown', function (evt) {
  // все перемещения слайдера будем считать в процентах,
  // для этого найдем масштбаный коэффициент
  // получим ширину слайдера и соотнесем ее к 100%
  var scaleFactor = effectLevelLine.offsetWidth / 100; // получаем ширину
  var startX = evt.clientX;
  var onMouseMove = function (moveEvt) {

    var shift = (startX - moveEvt.clientX);
    startX = moveEvt.clientX;
    var currentPosition = effectLevelPin.offsetLeft;
    var sliderPosition = (currentPosition - shift) / scaleFactor;

    if (sliderPosition < 0) {
      sliderPosition = 0;
    }

    if (sliderPosition > 100) {
      sliderPosition = 100;
    }

    effectLevelPin.style.left = sliderPosition + '%';
    effectLevelDepth.style.width = sliderPosition + '%';
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// реализация смены эффектов

var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
var effectsList = imgUpload.querySelector('.effects__list');

// функция добавляет целевому элементу задаваемый класс
// elemTarget - целевой элемент
// extraClass - задаваемый класс
var addElemntEffect = function (elemTarget, extraClass) { // сюда строку
  elemTarget.classList = ''; // обнуляем класс лист
  elemTarget.classList.add(UPLOADED_IMG_DEFAULT_CLASS); // добавляем класс по умолчанию
  elemTarget.classList.add(extraClass); // добавляем заданный класс
};

// функция обработчик
var onEffectsItemClick = function (evt) {

  if (evt.target.classList.contains('effects__preview')) {
    var extraClass = evt.target.classList.item(1); // забираем нужный класс у элемента по которому кликаем
    addElemntEffect(imgUploadPreview, extraClass);
    resetEffectLevel(DEFAULT_EFFECT_LEVEL);
  }
};

effectsList.addEventListener('click', onEffectsItemClick);


// реализация масштабирования

var SCALE = {
  SCALE_VALUE_DEFAULT: 1,
  SCALE_STEP: 0.25,
  LIMIT_SCALE_VALUES: [0.25, 1]
};

var scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
var scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');
var scaleControlValue = imgUpload.querySelector('.scale__control--value');
var scale = imgUpload.querySelector('.scale');

// функция устанавливает значение масштаба
var setScaleControlValue = function (value) {
  scaleControlValue.value = value * 100 + '%';
  imgUploadPreview.style.transform = 'scale(' + value + ')';
};

setScaleControlValue(SCALE.SCALE_VALUE_DEFAULT); // устанавливаем значение масштаба по умолчанию

// функция увеличивает масштаб изображения
var scaleUp = function (scaleValue, scaleStep, limitScaleValues) {
  if (scaleValue !== limitScaleValues[1]) {
    scaleValue = scaleValue + scaleStep;
  }

  return scaleValue;
};

// функция уменьшает масштаб изображения
var scaleDown = function (scaleValue, scaleStep, limitScaleValues) {
  if (scaleValue !== limitScaleValues[0]) {
    scaleValue = scaleValue - scaleStep;
  }

  return scaleValue;
};

// использует глобальные переменные, по возможности надо переписать
var onScaleControlClick = function (evt) {
  var target = evt.target;

  if (target === scaleControlSmaller) {
    SCALE.SCALE_VALUE_DEFAULT =
      scaleDown(SCALE.SCALE_VALUE_DEFAULT, SCALE.SCALE_STEP, SCALE.LIMIT_SCALE_VALUES);

  }
  if (target === scaleControlBigger) {
    SCALE.SCALE_VALUE_DEFAULT =
      scaleUp(SCALE.SCALE_VALUE_DEFAULT, SCALE.SCALE_STEP, SCALE.LIMIT_SCALE_VALUES);
  }

  setScaleControlValue(SCALE.SCALE_VALUE_DEFAULT);
};

scale.addEventListener('click', onScaleControlClick);
