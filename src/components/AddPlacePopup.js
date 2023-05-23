import {useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
    const setName = useRef();
    const setLink = useRef();

    useEffect(() => {
        setName.current.value = '';
        setLink.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: setName.current.value,
            link: setLink.current.value
        });
    }

    return (
        <PopupWithForm
            name='card-form'
            title='Новое место'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText='Создать'
        >
            <div className="popup__field">
                <input type="text" name="name" id="place-input"
                       className="popup__input popup__input_type_name-link"
                       placeholder="Название" minLength="2" maxLength="30" required ref={setName}/>
                <span className="popup__input-error place-input-error"></span>
            </div>
            <div className="popup__field">
                <input type="url" name="link" id="url-input" className="popup__input popup__input_type_link"
                       placeholder="Ссылка на картинку" required ref={setLink}/>
                <span className="popup__input-error url-input-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup