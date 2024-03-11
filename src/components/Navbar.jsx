import React, { useState, useEffect} from 'react'
import { IoMenu } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/slices/userSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import useLocalStorage from 'hooks/use-localstorage';
import i18n from '../i18n.js'

const Navbar = ({email}) => {

  const dispatch = useDispatch();

  const [wallet, setWallet] = useState();

  useEffect(() => {
    axios
      .post("https://dropclick.pro/base/getWallets.php", {
        email: email
      })
      .then(res => {
        setWallet(res.data);
      })
}, [])


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
      <Link to="/" className="navbar-brand">DROP<span >CLICK</span></Link>
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
        <div className='row'>
          <div className='col'>
            <button className='btn' style={{backgroundColor: '#1d1e23'}} onClick={handleLenguageChange}>
             {language === 'en' ? 'en' : 'ru'}
            </button>
          </div>
          <div className='col'>
            <li className="nav-item dropdown dropstart" style={{listStyleType: 'none', backgroundColor: '#e7ce50', borderRadius: '100%', marginTop: '-5px'}}>
                    <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: '30px', padding: '0px 9px'}}>

                        <IoMenu style={{color: 'black', marginTop: '-3px'}} />

                    </a>
                    <ul className="dropdown-menu ">
                      <li><Link to="/account" className="dropdown-item">{t("Office")}</Link></li>
                      <li><Link to="/wallet" state={wallet} className="dropdown-item">{t("Subscription")}</Link></li>
                      <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#navModal">{t("Referral Program")}</button></li>
                      {/* <li><Link to='/favorites' state={{email}} className="dropdown-item">Favorites</Link></li> */}
                      <li><hr className="dropdown-divider"/></li>
                      <li><button className="dropdown-item" onClick={() => dispatch(removeUser())}>{t("Log Out")}</button></li>
                    </ul>
            </li>
          </div>
        </div>
      </div>
      <div class="modal fade" id="navModal" tabindex="-1" aria-labelledby="navModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{t("Hello")}!</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  {t("Soon you will be able to earn money by inviting your friends. Wait for the announcement.")}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">OK</button>
                </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export {Navbar}