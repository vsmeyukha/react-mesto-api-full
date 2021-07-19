import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

  // ! объявляем стейт-переменные, которые будут привязаны к полям ввода формы и сделают их управляемыми
  const [username, setUsername] = React.useState('');
  const [description, setDescription] = React.useState('');

  const thisUser = React.useContext(CurrentUserContext);
  
  React.useEffect(() => {
    setUsername(thisUser.name);
    setDescription(thisUser.about);
  }, [thisUser]);

  // ! функция изменения значения инпута имени
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  // ! функция изменения значения инпута описания
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  // ! функция сабмита формы
  function handleSubmit() {

    // ! Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: username,
      about: description,
    });
  }

  // return (
  //   <Popup
  //     title="Как звать-то тебя?"
  //     name="user-info"
  //     isOpen={props.isOpen}
  //     onClose={props.onClose}
  //     onSubmit={handleSubmit}
  //   >
  //     <input
  //       type="text"
  //       className="popup__input popup__input_type_name"
  //       placeholder="Имя"
  //       name="user-name"
  //       required
  //       minLength="2"
  //       maxLength="40"
  //       id="user-name"
  //       value={username}
  //       onChange={handleUsernameChange}
  //     />
  //     <span className="popup__input-error" id="user-name-error"></span>
  //     <input
  //       type="text"
  //       className="popup__input popup__input_type_regalia"
  //       placeholder="Род деятельности"
  //       name="user-regalia"
  //       required
  //       minLength="2"
  //       maxLength="200"
  //       id="user-regalia"
  //       value={description}
  //       onChange={handleDescriptionChange}
  //     />
  //     <span className="popup__input-error" id="user-regalia-error"></span>
  //   </Popup>
  // )


  return (
    <PopupWithForm
      title="What is your name?"
      name="user-info"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonValue="Set user info"
    >
      <input
        type="text"
        className="form__input form__input_type_popup"
        placeholder="Имя"
        name="user-name"
        required
        minLength="2"
        maxLength="40"
        id="user-name"
        value={username}
        onChange={handleUsernameChange}
      />
      <span
        className="popup__input-error"
        id="user-name-error"
      ></span>
      <input
        type="text"
        className="form__input form__input_type_popup"
        placeholder="Род деятельности"
        name="user-regalia"
        required
        minLength="2"
        maxLength="200"
        id="user-regalia"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span
        className="popup__input-error"
        id="user-regalia-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;


// {/* <Popup
// title="Как звать-то тебя?"
// name="user-info"
// isOpen={props.isOpen}
// onClose={props.onClose}
// >
// <Form
//   onSubmit={handleSubmit}
//   type="popup"
//   buttonValue="Задать данные профиля"
// >

// </Form>
// </Popup> */}