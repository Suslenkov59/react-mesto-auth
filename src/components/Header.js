import headerLogo from '../images/logoWhite.svg';

function Header (){
    return (
        <header className="header">
            <img className="header__logo" alt="логотип" src={headerLogo}/>
        </header>
    )
}

export default Header;