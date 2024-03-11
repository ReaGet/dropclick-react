import React from 'react'
import { useTranslation } from 'react-i18next';
import useLocalStorage from 'hooks/use-localstorage';
import i18n from '../i18n.js'
import { Link } from 'react-router-dom'

const Nav = () => {

  const { t } = useTranslation();

  const [language, setLanguage] = useLocalStorage('language', 'ru');

const handleLenguageChange = () => {
    if (language === 'en') {
        i18n.changeLanguage('ru');
        setLanguage('ru');
    } else if (language === 'ru') {
        i18n.changeLanguage('en');
        setLanguage('en');
    }
};

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid margin">
        <a className="navbar-brand" >DROP<span >CLICK</span></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            <li className="nav-item">
              <a href='https://dropclick.pro/' className="nav-link" aria-current="page">{t("Home")}</a>
            </li>
            <li className="nav-item">
              <a href='https://dropclick.pro/#about' className="nav-link">{t("About the service")}</a>
            </li>
            <li className="nav-item">
              <a href='https://dropclick.pro/results' className="nav-link">{t("Results")}</a>
            </li>
            <li className="nav-item">
              <a href='https://dropclick.pro/#how' className="nav-link">{t("How does it work")}?</a>
            </li>
            <li className="nav-item">
              <a href='https://dropclick.pro/#contacts' className="nav-link">{t("Contacts")}</a>
            </li>
          </ul>
        </div>
        <button className='btn' style={{marginRight: '15px', backgroundColor: '#1d1e23'}} onClick={handleLenguageChange}>
              {language === 'en' ? 'en' : 'ru'}
            </button>
        <Link to='/login' className='btn btn-outline-success'>{t("Sign In")}</Link>
      </div>
    </nav>
  )
}

export {Nav}