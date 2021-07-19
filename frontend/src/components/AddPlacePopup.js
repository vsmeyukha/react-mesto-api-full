import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const cardNameInputRef = React.useRef('');
  const cardLinkInputRef = React.useRef('');

  function handleSubmit() {

    props.onAddPlace({
      name: cardNameInputRef.current.value,
      link: cardLinkInputRef.current.value
    });
  }

  // return (
  //   <Popup
  //     title="Новое место"
  //     name="add-new-card"
  //     isOpen={props.isOpen}
  //     onClose={props.onClose}
  //     onSubmit={handleSubmit}
  //   >
  //     <input
  //       type="text"
  //       className="popup__input popup__input_type_card-title"
  //       placeholder="Название картинки"
  //       name="card-title"
  //       required
  //       maxLength="30"
  //       id="card-title"
  //       ref={cardNameInputRef}
  //     />
  //     <span
  //       className="popup__input-error"
  //       id="card-title-error">
  //     </span>
  //     <input
  //       type="url"
  //       className="popup__input popup__input_type_card-link"
  //       placeholder="Ссылка на картинку"
  //       name="card-link"
  //       required
  //       id="card-link"
  //       ref={cardLinkInputRef}
  //     />
  //     <span
  //       className="popup__input-error"
  //       id="card-link-error">
  //     </span>
  //   </Popup>
  // )


  return (
    <PopupWithForm
      title="New place"
      name="add-new-card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonValue="Add place"
    >
      <input
        type="text"
        className="form__input form__input_type_popup"
        placeholder="Название картинки"
        name="card-title"
        required
        maxLength="30"
        id="card-title"
        ref={cardNameInputRef}
      />
      <span
        className="popup__input-error"
        id="card-title-error">
      </span>
      <input
        type="url"
        className="form__input form__input_type_popup"
        placeholder="Ссылка на картинку"
        name="card-link"
        required
        id="card-link"
        ref={cardLinkInputRef}
      />
      <span
        className="popup__input-error"
        id="card-link-error">
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;