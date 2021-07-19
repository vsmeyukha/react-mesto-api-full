import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithImage from './PopupWithImage';
import * as api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoToolTip from './InfoToolTip';

function App() {

  // ! создаем переменную состояния для задания контекста
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '',
    _id: ''
  });

  //! создаем переменную состояния для отслеживания, залогинен ли пользователь. в зависимости от того, true или false, будет обеспечен или не обеспечен доступ на главную страницу
  const [loggedIn, setLoggedIn] = React.useState(false);

// ! создаем переменную состояния, в которой хранится емэйл пользователя. впоследствии он будет передаваться пропсом в хедер для отображения
  const [userEmail, setUserEmail] = React.useState('');

  const history = useHistory();

  // ! функция, которая меняет флажок залогина
  function handleLogin() {
    setLoggedIn(true);
  }

  // ! обработчик регистрации, передадим его в компонент Register
  function handleRegistration(email, password) {
    auth.register(email, password)
    .then((res) => {
      if (res) {
        console.log(res);
        history.push('/sign-in');
        handleAuthPopupOpen();
      } else {
        return;
      }
    })
    .catch((err) => {
      handleAuthPopupOpen();
      console.error(err);
    });
  }

  function handleSignIn(email, password) {
    auth.authorize(email, password)
    .then((res) => {
      handleLogin();
      setUserEmail(email);
      history.push('/');
    })
    .catch((err) => console.error(err));
  }

  // ! обработчик разлогина. ниже мы передаем его пропсом в компонент Header
  // ? тут поменять надот логику. локалсторедж меняем на вызов фетч-запроса к контроллеру на бэке, который в свою очередь уже удалит куку 
  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
    history.push('/sign-in');
  }

    // ! проверяем, есть ли в хранилище токен. если есть, то меняем стейт-переменную loggedIn с false на true и открываем для пользователя главную страницу. этот эффект нужен для повторного входа пользователя, чтобы он не вводил при входе логин и пароль каждый раз, а заходил беспрепятственно, если он ранее залогинился. 
    React.useEffect(() => {
      function authForTheFirstTime() {
        auth.getUserData()
        .then((data) => {
          if (data) {
            console.log(data);
            console.log(loggedIn);

            setLoggedIn(true);
            
            const email = data.data.email;
            
            console.log(email);
            
            setUserEmail(email);
            
            history.push('/');
          } else {
            console.log('не пришли данные о юзере');
          }
        })
        .catch(err => console.error(err));
      };
  
      // ! вызывать токенчек только когда пользоваетль не залогинен 
      if (!loggedIn) {
        authForTheFirstTime();
      } return;
    }, [loggedIn, history]);

  // // ! проверяем, есть ли в хранилище токен. если есть, то меняем стейт-переменную loggedIn с false на true и открываем для пользователя главную страницу. этот эффект нужен для повторного входа пользователя, чтобы он не вводил при входе логин и пароль каждый раз, а заходил беспрепятственно, если он ранее залогинился. 
  // React.useEffect(() => {
  //   function tokenCheck() {
  //     const token = localStorage.getItem('token');

  //     if (token) {
  //       auth.getUserData(token)
  //       .then((data) => {
  //         if (data) {
  //           console.log(data);
  //           console.log(loggedIn);

  //           setLoggedIn(true);
            
  //           const email = data.data.email;
            
  //           console.log(email);
            
  //           setUserEmail(email);
            
  //           history.push('/');
  //         } else {
  //           console.log('не пришли данные о юзере');
  //         }
  //       })
  //       .catch(err => console.error(err));
  //     }
  //   };

  //   // ! вызывать токенчек только когда пользоваетль не залогинен 
  //   if (!loggedIn) {
  //     tokenCheck();
  //   } return;
  // }, [loggedIn, history]);

  // ! используем эффект, чтобы загрузить с сервера первоначальные данные юзера и записать хи в currentUser
  React.useEffect(() => {
    auth.getUserData()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => console.error(`Ошибка при получении данных профиля: ${err}`))
  }, []);

    // ! объявляем переменную состояния, в которую будет приходить массив карточек
    const [cards, setCards] = React.useState([]);

    // ! при монтировании элемента в переменную cards из API приходит массив карточек
    React.useEffect(() => {
      api.getInitialCards()
        .then(data => {
          setCards(data);
        })
        .catch(err => console.error(`Ошибочка вышла - ${err}`));
    }, []);
  
    // ! объявляем функцию лайка/отзыва лайка
    function handleCardLike(card) {

      // ! Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      
      // ! Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          // ! Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        // Обновляем стейт
          setCards(newCards);
        })
        .catch(err => console.error(`Ошибка добавления лайка: ${err}`))
    }
  
    function handleCardDelete(card) {
      api.deleteCard(card._id)
        .then((cardForDeleting) => {
          const cardsWithoutACard = cards.filter((c) => {
            if (c._id !== card._id) {
              return c;
            }
          })
          setCards(cardsWithoutACard);
        })
        .catch(err => console.error(`Ошибка удаления карточки: ${err}`))
    }

  // ! создаем переменные состояния для открытия попапов - с формой и без
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = React.useState(false);

  // ! пишем функции изменения состояния переменных для открытия попапов с формой
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAuthPopupOpen() {
    setIsAuthPopupOpen(true);
  }

  // ! создаем переменную состояния для открытия фотки
  const [selectedCard, setSelectedCard] = React.useState(null);

  // ! пишем функцию изменения состояния переменной для открытия попапа с фото
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // ! пишем функцию закрытия попапа
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsAuthPopupOpen(false);
  }

  // ! функция обновления данных профиля
  function handleUpdateUser(currentUser) {
    api.editProfile(currentUser)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.error(`Ошибка при редактировании данных профиля: ${err}`));
  }

  function handleUpdateAvatar(currentUser) {
    api.changeAvatar(currentUser)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.error(`Ошибка при редактировании аватара: ${err}`));
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then(data => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.error(`Ошибка при добавлении изображения: ${err}`));
  }

  return (
    // ! оборачиваем все приложение в провайдер контекста
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
      
        <div className="page__content">
      
          <Header userEmail={userEmail} loggedIn={loggedIn} onSignOut={signOut} />

          <Switch>

            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}

              // ? ниже пропсы компонента Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            {/* <Route exact path="/" >
              {!loggedIn ?
                <Redirect to="/sign-in" /> :
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }

            </Route> */}

            <Route path="/sign-up">
              <Register onRegister={handleRegistration} />
            </Route>

            <Route path="/sign-in">
              <Login onSignIn={handleSignIn} />
            </Route>
            
            </Switch>

          <Footer />
                
          {/* попап редактирования профиля */}

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

          {/* попап редактирования аватара */}

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/* попап добавления новой карточки */}

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <InfoToolTip
            isOpen={isAuthPopupOpen}
            onClose={closeAllPopups}
          />

          {/* попап с картинкой */}
            <PopupWithImage
              card={selectedCard}
              onClose={closeAllPopups}
            />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;