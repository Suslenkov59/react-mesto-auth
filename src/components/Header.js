import {useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import logo from '../images/logoWhite.svg';
import closed from "../images/menuIcon.svg";
import opened from "../images/closeMenuIcon.svg";

function Header({email, onSignOut}) {
    const [menuIsOpened, setMenuIsOpened] = useState(false);

    return (
        <header className="header">
            <div className="header__logo-container">
                <img className="header__logo" src={logo} alt="Логотип Место"/>
                <button
                    onClick={() => setMenuIsOpened((prev) => !prev)}
                    className="header__menu-btn"
                >
                    {menuIsOpened ? (
                        <img src={opened} alt=""/>
                    ) : (
                        <img src={closed} alt=""/>
                    )}
                </button>
            </div>
            <div className={`header__info${menuIsOpened ? "_visible" : ""}`}>
                {email && <p className="header__email">{email}</p>}
                <Routes>
                    <Route
                        path="/sign-up"
                        element={
                            <Link className="header__link" to="/sign-in">
                                Войти
                            </Link>
                        }
                    />
                    <Route
                        path="/sign-in"
                        element={
                            <Link className="header__link" to="/sign-up">
                                Регистрация
                            </Link>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <Link className="header__link" onClick={onSignOut} to="/sign-in">
                                Выйти
                            </Link>
                        }
                    />
                </Routes>
            </div>
        </header>
    );
}

export default Header;
