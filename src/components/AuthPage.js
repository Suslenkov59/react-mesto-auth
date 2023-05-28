import React from 'react'
import {Link} from 'react-router-dom';

function AuthPage({formName, onSubmit, title, children, buttonText}) {
    return (
        <div className='auth-page'>
            <form
                className='auth-page__form'
                name={formName}
                onSubmit={onSubmit}
            >
                <h2 className='auth-page__title'>{title}</h2>
                {children}
                <button
                    type="submit"
                    className='auth-page__button'
                >
                    {buttonText}
                </button>
                {
                    formName === 'register' &&
                    <Link className='auth-page__link' to='/sign-in'>Уже зарегистрированы? Войти</Link>
                }
            </form>
        </div>
    )
}

export default AuthPage;