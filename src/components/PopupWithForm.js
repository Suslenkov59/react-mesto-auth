function PopupWithForm ({name, isOpen, id, title, onSubmit, children, buttonText, onClose}) {
    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_open' : ''}`} id={id}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form popup__form_type_profile" name={name}
                      onSubmit={onSubmit}>
                    {children}
                    <button className="popup__button-save" type="submit">{buttonText || 'Сохранить'}</button>

                </form>
                <button className="popup__button-close" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm