import React from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';

function Register(props) {

  // ! переменные состояния для инпутов
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // ! записываем то, что ввел пользователь в поле емэйла, в соответствующую переменную состояния
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  // ! записываем то, что ввел пользователь в поле пароля, в соответствующую переменную состояния
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  // ! что происходит при клике по кнопке сабмита формы. отправляем запрос на сервер и в случае успеха переадресовываем пользователя на страницу входа. логика регистрации и входа - в файле Auth
  function handleSubmit() {
    props.onRegister(email, password);
  }



  return (
    <div className="form__container" >
      <h3 className="form__title" >Регистрация</h3>
      <Form
        name="sign-up"
        type="auth"
        buttonValue="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          className="form__input form__input_type_auth"
          placeholder="Email"
          name="email"
          required
          minLength="5"
          maxLength="40"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <span
          className="popup__input-error"
          id="user-name-error"></span>
        <input
          type="password"
          className="form__input form__input_type_auth"
          placeholder="Пароль"
          name="password"
          required
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <span
          className="popup__input-error"
          id="user-regalia-error"></span>
      </Form>
      <p>Уже зарегистрированы? <Link to="/sign-in">Войти</Link></p>

    </div>
  );
}

export default Register;