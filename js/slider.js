import { pristine } from './form.js';

const sliderElement = document.querySelector('.ad-form__slider');
const price = document.querySelector('#price');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1000,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
  pristine.validate();
});

export { sliderElement };
