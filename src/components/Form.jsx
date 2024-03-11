import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const Form = ({title, handleClick, err}) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const { t } = useTranslation();

  return (
    <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">{t(title)}</h2>
              <p className="text-white-50 mb-5">{t("Please enter your login and password")}!</p>

              <div className="form-outline form-white mb-4">
                <input type="email" id="typeEmailX" className="form-control form-control-lg" placeholder='Email'
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" id="typePasswordX" className="form-control form-control-lg" placeholder='Password'
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <p style={{color: 'red'}}>{err}</p>
              <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={() => handleClick(email, pass)}>{t(title)}</button>
    </div>
  )
}

export  { Form }