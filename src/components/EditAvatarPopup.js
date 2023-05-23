import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
    const avatarRef = useRef(null)

    useEffect( () => {
        avatarRef.current.value = '';
    }, [ props.isOpen ]);

    function handleSubmit(e) {
        e.preventDefault()
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    return (
        <PopupWithForm
            name='avatar-form'
            title='Обновить аватар'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText='Сохранить'
        >
            <div className="popup__field">
            <input type="url" name="avatar" id="avatar-input"
                   className="popup__input popup__input_type_avatar"
                   placeholder="Ссылка на картинку" required ref={avatarRef}/>
            <span className="popup__input-error avatar-input-error"></span>
                </div>
        </PopupWithForm>
            )
}

export default EditAvatarPopup