import { times } from './data.js';
import { sliderElement } from './slider.js';
import { marker, address, map } from './map.js';
import { inActiveForm, activeForm } from './activity.js';


const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const price = form.querySelector('#price');
const typeOfFlat = form.querySelector('#type');
const roomsNumber = form.querySelector('#room_number');
const places = form.querySelector('#capacity');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_NIGHT_PRICE = 100000;


const changeDropdownValue = (e) => {
  let time;
  let selectTarget;
  let text;
  if (e.target === timeIn) {
    selectTarget = timeOut;
    text = 'Выезд до';
  } else if (e.target === timeOut) {
    selectTarget = timeIn;
    text = 'Заезд после';
  }
  if (e.target.value === '12:00') {
    time = times[0];
    selectTarget.innerHTML = `
      <option value=${time} selected> ${text} ${time} </option>
      <option value=${times[1]}> ${text} ${times[1]} </option>
      <option value=${times[2]}> ${text} ${times[2]} </option>
    `;
  } else if (e.target.value === '13:00') {
    time = times[1];
    selectTarget.innerHTML = `
      <option value=${times[0]}> ${text} ${times[0]} </option>
      <option value=${time} selected> ${text} ${time} </option>
      <option value=${times[2]}> ${text} ${times[2]} </option>
    `;
  } else if (e.target.value === '14:00') {
    time = times[2];
    selectTarget.innerHTML = `
      <option value=${times[0]}> ${text} ${times[0]} </option>
      <option value=${times[1]}> ${text} ${times[1]} </option>
      <option value=${time} selected> ${text} ${time} </option>
    `;
  }
};

const pristine = new Pristine(form, {
  classTo: 'advert__element',
  errorTextParent: 'advert__element',
  errorTextClass: 'advert__error',
});

const hasTitleValidLength = (string) =>
  string.length >= MIN_TITLE_LENGTH && string.length <= MAX_TITLE_LENGTH;

const hasMaxNightPrice = (num) => num <= MAX_NIGHT_PRICE;

const hasMinPrice = (num, minPrice) => num >= minPrice;

const hasMaxPrice = (num) => {
  if ((typeOfFlat.value) === 'bungalow') {
    price.placeholder = '0';
    return hasMinPrice(num, 0);
  } else if ((typeOfFlat.value) === 'flat') {
    price.placeholder = '1000';
    return hasMinPrice(num, 1000);
  } else if ((typeOfFlat.value) === 'hotel') {
    price.placeholder = '3000';
    return hasMinPrice(num, 3000);
  } else if ((typeOfFlat.value) === 'house') {
    price.placeholder = '5000';
    return hasMinPrice(num, 5000);
  } else if ((typeOfFlat.value) === 'palace') {
    price.placeholder = '10000';
    return hasMinPrice(num, 10000);
  }
};

const roomsNumberGuestsAvailable = (num) => {
  if (((roomsNumber.value) === '1') && ((places.value) === '1')) {
    return num;
  } else if (((roomsNumber.value) === '2') && ((((places.value) === '2')) || ((places.value) === '1'))) {
    return num;
  } else if (((roomsNumber.value) === '3') && ((((places.value) === '3')) || ((places.value) === '2') || ((places.value) === '1'))) {
    return num;
  } else if ((roomsNumber.value === '100') && ((places.value) === '0')) {
    return num;
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

pristine.addValidator(title, hasTitleValidLength, 'Неправильно заполнен заголовок');
pristine.addValidator(price, hasMaxNightPrice, 'Цена не должна превышать 100 000 руб.');
pristine.addValidator(price, hasMaxPrice, 'Цена не должна быть ниже установленного значения');
pristine.addValidator(places, roomsNumberGuestsAvailable, 'Недоступное количество комнат');

const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form), inActiveForm());
      unblockSubmitButton();
      activeForm();
    }
  });
};

pristine.validate();

const formStartCondition = () => {
  form.reset();
  pristine.reset();
  sliderElement.noUiSlider.set(0);
  map.closePopup();
  marker.setLatLng({
    lat: 35.68519,
    lng: 139.75159,
  });
  address.value = `${(35.68519).toFixed(5)}, ${(139.75159).toFixed(5)}`;
};

resetButton.addEventListener('click', formStartCondition);
typeOfFlat.addEventListener('change', hasMaxPrice);
roomsNumber.addEventListener('change', () => {
  pristine.validate();
});
timeIn.addEventListener('change', changeDropdownValue);
timeOut.addEventListener('change', changeDropdownValue);

export { formStartCondition, setOnFormSubmit, pristine };


