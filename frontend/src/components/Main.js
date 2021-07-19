import React from 'react';
import Profile from './Profile';
import Cards from './Cards';

function Main(props) {

  return (
    <main className="main">
      <Profile
        onEditProfile={props.onEditProfile}
        onAddPlace={props.onAddPlace}
        onEditAvatar={props.onEditAvatar}
      />
      <Cards
        onCardClick={props.onCardClick}
        cards={props.cards}
        onCardLike={props.onCardLike}
        onCardDelete={props.onCardDelete}
      />
    </main>
  );
}

export default Main;