import {useEffect, useState} from 'react';
import {api} from '../utils/Api'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
    const [selectedCard, handleCardClick] = useState(null)
    const [cards, setCards] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        api.getInitialCards()
            .then((data) => {
                setCards(data)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data)
            })
            .catch((err) => console.log(err))
    }, [])

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true)
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false)
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
        handleCardClick(null)
    }

    function onCardClick(card) {
        handleCardClick(card)
    }

    function handleUpdateUser(userItem) {
        api.setUserInfoApi(userItem.name, userItem.about)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(userData) {
        api.setUserAvatar(userData)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch((err) => console.log(err))
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cardsArray) => cardsArray.filter((cardItem) => cardItem._id !== card._id))
            })
            .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(cardData) {
        api.addNewUserCard(cardData)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                < Header/>
                < Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={onCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}/>
                < Footer/>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <PopupWithForm
                    name='confirm-delete'
                    title='Вы уверены?'
                    buttonText='Да'
                />
                < ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

