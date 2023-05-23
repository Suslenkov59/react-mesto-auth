function ImagePopup(props) {
    return (
        <div className={`popup popup_viewImage ${props.card ? 'popup_open' : ''}`}>
            <div className="popup__container popup__container_type_img">
                <img className="popup__img" src={props.card?.link}
                     alt={props.card ? props.card.name : ''}/>
                <h2 className="popup__name">{props.card ? props.card.name : ''}</h2>
                <button className="popup__button-close" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup