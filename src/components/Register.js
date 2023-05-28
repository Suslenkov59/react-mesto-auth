import React, {useState} from 'react'
import AuthPage from './AuthPage'

export default function Register({onRegister}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleChange(e) {
        const {value} = e.target
        e.target.name === 'Email' ? setEmail(value) : setPassword(value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        onRegister(password, email)
    }

    return (
        <div className='register'>
            <AuthPage
                formName='register'
                onSubmit={handleSubmit}
                title='Регистрация'
                buttonText='Зарегистрироваться'
            >
                <input
                    type="email" name="Email" id="email"
                    className="popup__input popup__input_type_login-register"
                    placeholder="Email" minLength="6" maxLength="40" required value={email || ''}
                    onChange={handleChange}
                />
                <input
                    type="password" name="Password" id="password"
                    className="popup__input popup__input_type_login-register"
                    placeholder="Пароль" minLength="6" maxLength="40" required value={password || ''}
                    onChange={handleChange}
                />
            </AuthPage>
        </div>
    )
}