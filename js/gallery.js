'use strict';

var randomUserImgContainer = document.querySelector('.pictures'); // получаем блок для вставки случайных фото
var photoDescriptions = window.data; // создаем массив описаний

window.picture.insertRandomUserImges(photoDescriptions, randomUserImgContainer);
