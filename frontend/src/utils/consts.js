// * вынесем отдельным объектом все используемые при валидации классы
const validationConfig = {
    form: '.popup__form',
    input: '.popup__input',
    submitButton: '.popup__submit',
    submitButtonDisabled: 'popup__submit_disabled',
    inputTypeError: 'popup__input_type_error',
    errorText: 'popup__input-error_active'
}
  
export const SAVE_BTN_TEXT = 'Сохранить';
export const YES_BTN_TEXT = 'Да';
export const WAIT_BTN_TEXT = 'Подожди чутка';

export default validationConfig;