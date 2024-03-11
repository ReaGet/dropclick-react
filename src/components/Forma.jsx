import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Forma = ({title, handleClick}) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [repass, setRepass] = useState('');
    const [code, setCode] = useState('');
    const [referal, setReferal] = useState('');

    const { t } = useTranslation();

    const [rand, setRand] = useState((Math.floor(Math.random() * (999 - 100 + 1)) + 100).toString());
    const [btn, setBtn] = useState('Отправить код');
    const [error, setError] = useState('');


    const handleMail = () => {
      if (rand > 0) {        
        axios
        .post("https://dropclick.pro/base/postMail.php", {
          code: rand,
          email: email
        }) .then(() => {
          setBtn('Код отправлен');
        })  
      }
    };

    const handleValid = () => {
      if (rand === code) {
        if (pass === repass) {          
        handleClick(email, pass, referal);
        } else {
          setError('Пароли не совпадают')
        }
      } else {
        setError('Код не совпадает')
      }
    }
    

  return (
    <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-5 text-uppercase">{t(title)}</h2>

              <div className="form-outline form-white mb-4">
                <input type="email" id="typeEmailX" className="form-control form-control-lg" placeholder='Email'
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='row'>
                <div className='col-6'>
                  <div className="form-outline form-white mb-4">
                    <input type="text" id="code" className="form-control form-control-lg" placeholder='Код' required
                      value={code} onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <button className="btn btn-outline-light btn-lg" onClick={handleMail}>{btn}</button>
                </div>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" id="typePasswordX" className="form-control form-control-lg" placeholder='Пароль'
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <div className="form-outline form-white mb-4">
                <input type="password" id="pass" className="form-control form-control-lg" placeholder='Повторите пароль'
                  onChange={(e) => setRepass(e.target.value)}
                />
              </div>
              <div className="form-outline form-white mb-4">
                <input type="text" id="ref" className="form-control form-control-lg" placeholder='Реферальный код'
                onChange={(e) => setReferal(e.target.value)}
                />
              </div>
              <p style={{color: 'red'}}>{error}</p>
              <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleValid}>{t(title)}</button>
    </div>
  )
}

export  { Forma }