import React from 'react';
import Form from './Form';

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit() {
    props.onSignIn(email, password);
  }

  return (
    <div className="form__container" >
      <h3 className="form__title" >Вход</h3>
      <Form
        name="sign-in"
        type="auth"
        buttonValue="Войти"
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
          minLength="5"
          maxLength="40"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <span
          className="popup__input-error"
          id="user-regalia-error"></span>
      </Form>
    </div>
  );
}

export default Login;