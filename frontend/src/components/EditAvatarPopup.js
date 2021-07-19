import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarInputRef = React.useRef('');

  function handleSubmit() {
    // e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarInputRef.current.value
    })
  }
  
return (
  <PopupWithForm
    title="Change ava"
    name="change-avatar"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    buttonValue="Change ava"
  >
    <input
      type="url"
      className="form__input form__input_type_popup"
      placeholder="Ссылка на аву"
      name="avatar-link"
      required
      id="avatar-link"
      ref={avatarInputRef}
    />
    <span
      className="popup__input-error"
      id="avatar-link-error">
    </span>
  </PopupWithForm>
);
}

export default EditAvatarPopup;