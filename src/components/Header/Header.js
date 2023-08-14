import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';


function Header() {

    return(
        <header className='header'>
            <div className="header__container">
                <Link className="header__link">
                  <img className="header__logo" src={logo} alt="Логотип" />
                </Link>
            <div className="header__nav">
                <Link className="header__button">Регистрация</Link>
                <Link className="header__button header__button_active">Войти</Link>
            </div>
             
            </div>
           
        </header>
    )
}

export default Header;