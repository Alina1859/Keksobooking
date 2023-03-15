const mapFilters = document.querySelector('.map__filters');

const getOffersFilter = (offer) => {

  const offersArray = offer.slice();

  const housingTypeInput = document.querySelector('[name="housing-type"]');
  const housingPriceInput = document.querySelector('[name="housing-price"]');
  const housingRoomsInput = document.querySelector('[name="housing-rooms"]');
  const housingGuestsInput = document.querySelector('[name="housing-guests"]');
  const housingFeaturesInput = document.querySelectorAll('[name="features"]');

  function housingTypeFilter(item) {
    if ((item.offer.type === housingTypeInput.value) || (housingTypeInput.value === 'any')) {
      return item;
    }
  }

  function housingPriceFilter(item) {
    if (housingPriceInput.value === 'low') {
      return (item.offer.price < 10000);
    } else if (housingPriceInput.value === 'middle') {
      return (item.offer.price >= 10000 && item.offer.price < 50000);
    } else if (housingPriceInput.value === 'high') {
      return (item.offer.price >= 50000);
    } else if (housingPriceInput.value === 'any') {
      return item;
    }
  }

  function housingRoomsFilter(item) {
    if (housingRoomsInput.value === '1') {
      return (item.offer.rooms === 1);
    } else if (housingRoomsInput.value === '2') {
      return (item.offer.rooms === 2);
    } else if (housingRoomsInput.value === '3') {
      return (item.offer.rooms === 3);
    } else if (housingRoomsInput.value === 'any') {
      return item;
    }
  }

  function housingGuestsFilter(item) {
    if (housingGuestsInput.value === '1') {
      return (item.offer.guests === 1);
    } else if (housingGuestsInput.value === '2') {
      return (item.offer.guests === 2);
    } else if (housingGuestsInput.value === '0') {
      return (item.offer.guests === 0);
    } else if (housingGuestsInput.value === 'any') {
      return item;
    }
  }

  const feauturesArr = [];
  housingFeaturesInput.forEach((feauture) => {
    if (feauture.checked) {
      feauturesArr.push(feauture.value);
    }
  });


  function housingFeaturesFilter(item) {
    if ((item.offer.features) !== undefined) {
      const allFounded = feauturesArr.every( (feaut) => (item.offer.features).includes(feaut));
      if (allFounded) {
        return item;
      }
    } else {
      return item;
    }
  }

  return offersArray.filter(housingTypeFilter).filter(housingPriceFilter).filter(housingRoomsFilter).filter(housingGuestsFilter).filter(housingFeaturesFilter);

};

export { getOffersFilter, mapFilters };
