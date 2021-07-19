import React from 'react';

function Form(props) {


  // todo это попозже раскомментировать, когда все обработчики будут портированы в App.js
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }
  
  return (
    <form
      className={`form form_type_${props.type}`}
      name={props.name}
      onSubmit={handleSubmit}>
      
      <fieldset className={`form__fieldset form__fieldset_type_${props.type}`}>
        {props.children}
      </fieldset>
      
      <button
        type="submit"
        className={`form__submit form__submit_type_${props.type}`}
        value={props.buttonValue}
        name="submit">
        {props.buttonValue}
      </button>
      
    </form>
  )
}

export default Form;