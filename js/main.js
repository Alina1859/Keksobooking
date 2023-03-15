import './slider.js';
import { getOffers, sendData } from './api.js';
import { addOfferPins } from './map.js';
import { showAlert, debounce } from './util.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { formStartCondition, setOnFormSubmit } from './form.js';
import { markerGroup } from './map.js';
import { mapFilters } from './filter.js';
import './avatar.js';

const onSendDataSuccess = () => {
  showSuccessMessage();
  formStartCondition();
};

const onSendDataError = () => {
  showErrorMessage();
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, onSendDataError, data);
});

getOffers(addOfferPins, showAlert);

mapFilters.addEventListener('change', debounce(
  () => {
    markerGroup.clearLayers();
    getOffers(addOfferPins, showAlert);
  })
);
