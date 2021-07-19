import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function Header(props) {

  const history = useHistory();
  const location = useLocation();

  // ! определяем, какой текст будет отображаться на кнопке
  let buttonText = 'Войти';

  if (location.pathname === '/sign-in') {
    buttonText = 'Регистрация'
  }

  // ! функция для перехода к экрану регистрации, ее передаем кнопке в зависимости от условия
  function goToSignUp() {
    history.push('/sign-up');
  }

  // ! функция для перехода к экрану входа, ее передаем кнопке в зависимости от условия
  function goToSignIn() {
    history.push('/sign-in');
  }

  //! определяем, какая функция будет вызываться по клику на кнопку
  function setButtonAction() {
    if (location.pathname === '/sign-in') {
      goToSignUp();
    } else {
      goToSignIn();
    }
  }

  // ? вот так не работает, если второй if стоит. работает только так, как выше - с else. почему?
  // function setButtonAction() {
  //   if (history.location.pathname === '/sign-in') {
  //     goToSignUp();
  //   } if (history.location.pathname === '/sign-up') {
  //     goToSignIn();
  //   }
  // }

  return (
    <header className="header">
      <div className="logo"></div>
      <div className="header__auth">
        <p className="header__user-email">{props.userEmail}</p>
        <button onClick={props.loggedIn ? props.onSignOut : setButtonAction} className="header__button" >{props.loggedIn ? 'Выйти!' : buttonText}</button>
      </div>
    </header>
  );
}

export default Header;