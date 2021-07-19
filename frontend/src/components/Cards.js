import React from 'react';
import Card from './Card';

function Cards(props) {

  return (
    <section className="cards" >
      {props.cards.map(card => {

        return (

          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onLikeClick={() => props.onCardLike(card)}
            onCardDelete={() => props.onCardDelete(card)}
          />
        );
      })}
    </section>
  );
}

export default Cards;