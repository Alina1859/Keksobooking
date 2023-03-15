import { createCard } from './card.js';
import { getOffersFilter } from './filter.js';

const address = document.querySelector('#address');
const form = document.querySelector('.ad-form');
const resetButton = form.querySelector('.ad-form__reset');

const OFFERS_COUNT = 10;

const addressCenterOfTokio = {
  lat: 35.68519,
  lng: 139.75159,
};

const map = L.map('map-canvas')
  .on('load', () => {
    address.value = `${addressCenterOfTokio.lat}, ${addressCenterOfTokio.lng}`;
  })
  .setView({
    lat: addressCenterOfTokio.lat,
    lng: addressCenterOfTokio.lng,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: addressCenterOfTokio.lat,
    lng: addressCenterOfTokio.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

marker.on('moveend', (evt) => {
  address.value = `${(evt.target.getLatLng().lat).toFixed(5)}, ${(evt.target.getLatLng().lng).toFixed(5)}` ;
});

resetButton.addEventListener('click', () => {
  marker.setLatLng({
    lat: 35.68519,
    lng: 139.75159,
  });
});

const commonPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [52, 52],
});

const markerGroup = L.layerGroup().addTo(map);

const addOfferPins = (offers) => {
  const filtered = offers.slice();
  getOffersFilter(filtered).slice(0, OFFERS_COUNT).forEach((filt) => {
    const {lat, lng} = filt.location;
    const commonMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: commonPinIcon,
      },
    );
    commonMarker
      .addTo(markerGroup)
      .bindPopup(createCard(filt));
  });
};

export { addOfferPins, marker, address, map, markerGroup };


