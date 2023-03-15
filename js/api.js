import { inActiveMapFilter, activeMapFilter } from './activity.js';

const getOffers = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      'https://25.javascript.pages.academy/keksobooking/data'
    );

    if (!response.ok) {
      inActiveMapFilter();
      throw new Error('Не удалось загрузить объявления');
    }

    const offers = await response.json();
    activeMapFilter();
    onSuccess(offers);
  } catch (error) {
    inActiveMapFilter();
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://25.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body,
      },
    );

    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }

    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export { getOffers, sendData };

