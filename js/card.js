const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createCard = ({author, offer}) => {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = ` Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  card.querySelector('.popup__avatar').src = author.avatar;

  card.querySelector('.popup__description').textContent = offer.description;
  if (card.querySelector('.popup__description').textContent === '') {
    card.querySelector('.popup__description').remove();
  }

  switch (offer.type) {
    case 'flat':
      offer.type = 'Квартира';
      break;
    case 'bungalow':
      offer.type = 'Бунгало';
      break;
    case 'house':
      offer.type = 'Дом';
      break;
    case 'palace':
      offer.type = 'Дворец';
      break;
    case 'hotel':
      offer.type = 'Отель';
      break;
  }
  card.querySelector('.popup__type').textContent = offer.type;

  const featureContainer = card.querySelector('.popup__features');
  const featuresList = featureContainer.querySelectorAll('.popup__feature');

  featuresList.forEach((feauturesListItem) => {
    if (offer.features) {
      const isNecessary = offer.features.some(
        // eslint-disable-next-line prefer-template
        (item) => feauturesListItem.classList.contains('popup__feature--' + item),
      );

      if (!isNecessary) {
        feauturesListItem.remove();
      }
    }
  });

  const photos = offer.photos;


  if(photos) {
    photos.forEach((photo) => {
      const imgTemplate = cardTemplate.querySelector('.popup__photo');
      const img = imgTemplate.cloneNode(true);
      img.src = photo;
      card.querySelector('.popup__photos').append(img);
    });
  }

  const photosContainer = card.querySelector('.popup__photos');
  photosContainer.removeChild(photosContainer.firstElementChild);

  return card;
};

export { createCard };


