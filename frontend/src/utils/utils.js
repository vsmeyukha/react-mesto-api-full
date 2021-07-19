import { SAVE_BTN_TEXT, YES_BTN_TEXT, WAIT_BTN_TEXT } from './consts';

const renderLoading = (popupSelector) => {
  const popup = document.querySelector(popupSelector);
  const submitButton = popup.querySelector('.popup__submit');
  if (submitButton.textContent === SAVE_BTN_TEXT || submitButton.textContent === YES_BTN_TEXT) {
    submitButton.textContent = WAIT_BTN_TEXT
  } else {
    if (popupSelector === '.popup_type_profile-edit' || popupSelector === '.popup_type_change-avatar' || popupSelector === '.popup_type_add-new-card') {
      submitButton.textContent = 'Сохранить';
    } else {
      submitButton.textContent = 'Да';
    }
  }
}

export { renderLoading };