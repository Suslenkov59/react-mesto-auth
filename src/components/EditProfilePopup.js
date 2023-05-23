import { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.onUpdateUser({
            name,
            about: description
        })
    }

    return (
        <PopupWithForm
            name='profile-form'
            title='Редактировать профиль'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText='Сохранить'
        >
            <div className="popup__field">
            <input type="text" name="name" id="name-input"
                   className="popup__input popup__input_type_name"
                   placeholder="Имя" minLength="2" maxLength="40" required value={name || ''}  onChange={handleChangeName}/>
            <span className="popup__input-error name-input-error"></span>
            </div>
                <div className="popup__field">
            <input type="text" name="job" id="job-input" className="popup__input popup__input_type_job"
                   placeholder="О себе" minLength="2" maxLength="200" required value={description || ''}  onChange={handleChangeDescription}/>
            <span className="popup__input-error job-input-error"></span>
                </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup