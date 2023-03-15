import {
  getRandomPositiveInteger,
  getRandomFloatingNumber,
  // eslint-disable-next-line no-unused-vars
  checkStringLength,
  getRandomArrayElement,
  getShuffledArray,
  getShuffleArraysElements
} from './util.js';

const OBJECTS_LENGHT = 10;
const places = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const times = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createPhotos = () =>
  Array.from({ length: 1}, () =>
    getShuffleArraysElements(photos, getRandomPositiveInteger(1, photos.length))
  );

const createNumbers = (num) => {
  const arr = getShuffledArray(num);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 10) {
      // eslint-disable-next-line no-useless-concat
      arr[i] = '0' + `${arr[i]}`;
    }
  }
  return arr;
};

const numbersOfPhotos = createNumbers(OBJECTS_LENGHT);

function createLocationArr(latRandom, lngRandom) {
  const locationArr = new Array;
  locationArr.push({
    lat: latRandom,
    lng: lngRandom,
  });

  return locationArr;
}

const createAnnouncement = (index) => {
  const location = createLocationArr(getRandomFloatingNumber(35.65000, 35.70000), getRandomFloatingNumber(139.70000, 139.80000))[0];
  return {
    location,
    author: {
      avatar: `img/avatars/user${numbersOfPhotos[index]}.png`
    },
    offer: {
      address: `${location.lat}, ${location.lng}`,
      title: 'This is offer',
      price: getRandomPositiveInteger(500, 10000),
      type: getRandomArrayElement(places),
      rooms: getRandomPositiveInteger(1, 100),
      guests: getRandomPositiveInteger(1, 100),
      checkin: getRandomArrayElement(times),
      checkout: getRandomArrayElement(times),
      feautures: getShuffleArraysElements(features, getRandomPositiveInteger(1, features.length)),
      description: 'this is your description',
      photos: createPhotos(),
    },
  };
};

const getObject = () =>
  Array.from({length: OBJECTS_LENGHT}, (value, objectIndex) =>
    createAnnouncement(objectIndex)
  );

export {
  getObject,
  times
};
