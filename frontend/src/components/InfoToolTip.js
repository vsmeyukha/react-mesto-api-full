import React from 'react';
import { useHistory } from 'react-router-dom';
import Popup from './Popup';
import successImage from '../images/success.svg';
import errorImage from '../images/error.svg';

function InfoToolTip(props) {

  const history = useHistory();
  const location = history.location.pathname;

  return (
    <Popup name="auth-popup" title="" isOpen={props.isOpen} onClose={props.onClose} >
      <div className="popup__auth-container">
        <img className="popup__auth-img" src={(location === '/sign-in') ? successImage : errorImage} alt="Статус регистрации" />
        <h3 className="popup__title">{(location === '/sign-in') ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!"}</h3>
      </div>
    </Popup>
  )
}

export default InfoToolTip;