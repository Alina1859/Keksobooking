const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilters = mapFilter.querySelectorAll('.map__filter');

function inActiveMapFilter() {
  mapFilter.classList.add('ad-form--disabled');
  mapFilters.forEach((filter) => {
    filter.setAttribute('disabled', '');
  });
}

function inActiveForm() {
  form.classList.add('ad-form--disabled');

  fieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', '');
  });
}

function activeMapFilter() {
  mapFilter.classList.remove('ad-form--disabled');

  mapFilters.forEach((filter) => {
    filter.removeAttribute('disabled', '');
  });
}

function activeForm() {
  form.classList.remove('ad-form--disabled');

  fieldsets.forEach((fieldset) => {
    fieldset.removeAttribute('disabled', '');
  });
}

export {
  inActiveMapFilter,
  inActiveForm,
  activeMapFilter,
  activeForm
};
