import React from 'react';

// function PopupWithForm(props) {

//   return (
//     <div className={
//       `popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`
//     }>
      
//       <div className="popup__container">
//         <button className="popup__close-button popup__close-button_type_popup-with-forms" type="button" onClick={props.onClose}></button>
//         <h3 className="popup__title">{props.title}</h3>
//         <form className={`popup__form popup__form_type_${props.name}`} name={props.name} noValidate onSubmit={props.onSubmit}>
//             <fieldset className={`popup__fieldset popup__fieldset_type_${props.name}`}>
//               {props.children}
//             </fieldset>
//             <button type="submit" className="popup__submit" value="Сохранить" name="submit">Сохранить</button>
//           </form>
//       </div>

//     </div>
//   );
// }

function Popup(props) {

  return (
    <div className={
      `popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`
    }>
      
      <div className="popup__container">
        <button className="popup__close-button popup__close-button_type_popup-with-forms" type="button" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        {props.children}
      </div>

    </div>
  );
}

export default Popup;