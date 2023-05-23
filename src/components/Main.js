import React from 'react'
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {
    const currentUser = React.useContext(CurrentUserContext)

    return (<main className="main">
        <section className="profile">
            <img className="profile__avatar" alt="аватарка" src={currentUser.avatar}/>
            <button className="profile__avatar-button" type="button" onClick={onEditAvatar}></button>
            <div className="profile__info">
                <h1 className="profile__info-name">{currentUser.name}</h1>
                <p className="profile__info-description">{currentUser.about}</p>
                <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>
        <section className="elements">
            <ul className="elements__container">
                {cards.map((card) => <Card key={card._id}
                                           card={card}
                                           onCardClick={onCardClick}
                                           onCardLike={onCardLike}
                                           onCardDelete={onCardDelete}
                />)}
            </ul>
        </section>
    </main>)
}

export default Main