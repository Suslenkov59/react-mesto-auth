import {useEffect, useState} from 'react';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import {api} from '../utils/Api'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from "./Login";
import Register from "./Register";
import * as auth from '../utils/auth'
import InfoTooltip from './InfoTooltip'
import success from '../images/success.svg'
import unSuccess from '../images/unsuccess.svg'

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
    const [selectedCard, handleCardClick] = useState(null)
    const [cards, setCards] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
    const [message, setMessage] = useState({imgPath: '', text: ''})
    const [email, setEmail] = useState('')
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [dataLoadingError, setDataLoadingError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        loggedIn &&
        Promise.all([ api.getUserInfo(), api.getInitialCards()] )
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards);
                setDataIsLoaded(true);
            })
            .catch((err) => {
                setDataLoadingError(`Что-то пошло не так... (${err})`);
                console.log(err);
            });
    }, [loggedIn]);

    useEffect(() => {
        handleTokenCheck()
    }, [])

    function handleTokenCheck() {
        const jwt = localStorage.getItem('jwt')

        if (jwt) {
            auth.getContent(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true)
                        setEmail(res.data.email)
                        navigate("/")
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    function handleRegistration(password, email) {
        auth.register(password, email)
            .then((result) => {
                setEmail(result.data.email)
                setMessage({imgPath: success, text: 'Вы успешно зарегистрировались!'})
            })
            .catch(() => setMessage({imgPath: unSuccess, text: 'Что-то пошло не так! Попробуйте ещё раз.'}))
            .finally(() => setIsInfoTooltipOpen(true))
    }

    function handleAuth(password, email) {
        auth.authorize(password, email)
            .then((res) => {
                if (res) {
                    setEmail( email)
                    setLoggedIn(true)
                    navigate("/")
                }
            })
            .catch((err) => console.log(err))
    }

    function onSignOut() {
        localStorage.removeItem('jwt')
        setLoggedIn(false)
    }

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
        setIsInfoTooltipOpen(false)
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
        <div>
            <CurrentUserContext.Provider value={currentUser}>

                <Header
                    loggedIn={loggedIn}
                    email={email}
                    onSignOut={onSignOut}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute
                                element={Main}
                                loggedIn={loggedIn}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={onCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                                dataIsLoaded={dataIsLoaded}
                                dataLoadingError={dataLoadingError}
                            />
                        }
                    />
                    <Route
                        path="/sign-up"
                        element={<Register
                            isOpen={isEditProfilePopupOpen}
                            onRegister={handleRegistration}
                            isInfoTooltipOpen={isInfoTooltipOpen}
                        />}
                    />
                    <Route
                        path="/sign-in"
                        element={
                            <Login
                                isOpen={isEditProfilePopupOpen}
                                onAuth={handleAuth}
                            />
                        }
                    />
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
                < Footer/>
                <InfoTooltip
                    name='tooltip'
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    title={message.text}
                    imgPath={message.imgPath}
                />
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

            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;

