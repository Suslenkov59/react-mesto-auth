function InfoTooltip({isOpen, onClose, title, imgPath}) {

    return (
        <div className={`popup ${isOpen ? 'popup_open' : ''}`}>
            <div className="popup__container">
                <div className='popup__info-container'>
                    <img src={imgPath} alt={imgPath} className='popup__info-icon'/>
                    <h2 className="popup__title popup__title_type_tooltip">{title}</h2>
                </div>
                <button
                    type="button" className="popup__button-close"
                    onClick={onClose}
                >
                </button>
            </div>
        </div>
    )
}

export default InfoTooltip
