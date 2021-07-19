import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {

  // ! подписываем компонент Card на контекст
  const { _id } = React.useContext(CurrentUserContext);
  // debugger;
  const isOwn = props.card.owner._id === _id;

  const cardDeleteButtonClassName = (`card__delete-card ${isOwn ? '' : 'card__delete-card_invisible'}`);

  const isLiked = props.card.likes.some(i => i._id === _id);

  const cardLikeButtonClassName = (`card__like-button ${isLiked ? 'card__like-button_active' : ''}`); 

  function handleClick() {
    props.onCardClick(props.card);
  } 

  return (
    <div className="card">
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__img" onClick={() => handleClick(props.card.link)} />
      <button className={cardDeleteButtonClassName} onClick={props.onCardDelete}></button>
      <div className="card__name">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like">
          <button className={cardLikeButtonClassName} onClick={props.onLikeClick}></button>
          <p className="card__like-scope">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;