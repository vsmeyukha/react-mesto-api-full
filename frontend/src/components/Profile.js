import React from 'react';
// import cousteau from '../images/cousteau.jpg';
import pencil from '../images/pencil.svg';
import plus from '../images/plus.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';


function Profile(props) {

  // ! Подписываем компонент Profile на контекст
  const { name, about, avatar } = React.useContext(CurrentUserContext);

  return (
    <section className="profile">

      <div className="profile__avatar">
        <button
          className="profile__avatar-button"
          onClick={props.onEditAvatar}
        >
          <img
            src={pencil}
            alt="карандаш"
            className="profile__avatar-pencil"
          />
        </button>
        <img
          src={avatar}
          alt="Аватар пользователя"
          className="profile__avatar-image" />
      </div>

      <h1 className="profile__name">{ name }</h1>
      <p className="profile__regalia">{ about }</p>

      <button
        className="profile__edit-button"
        onClick={props.onEditProfile}
      >
        <img
          src={pencil}
          alt="карандаш"
          className="profile__pencil"
        />
      </button>

      <button
        className="profile__add-button"
        onClick={props.onAddPlace}
      >
        <img
          src={plus}
          alt="плюс"
          className="profile__plus"
        />
      </button>

    </section>
  );
}

export default Profile;