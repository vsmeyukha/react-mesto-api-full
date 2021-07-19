import React from 'react';
import Popup from './Popup';
import Form from './Form';

function PopupWithForm(props) {
  return (
    <Popup
      name={props.name}
      isOpen={props.isOpen}
      title={props.title}
      onClose={props.onClose}
    >
      <Form
        onSubmit={props.onSubmit}
        type="popup"
        buttonValue={props.buttonValue}
      >
        {props.children}
      </Form>
    </Popup>
  )

}

export default PopupWithForm;

// return (
//   <Popup 
//     name={props.name}
//     isOpen={props.isOpen}
//     title={props.title}>
//     onClose={props.onClose}
//   >
//       <Form
//         onSubmit={props.handleSubmit}>
//         {props.children}
//       </Form>
//   </Popup>


// );