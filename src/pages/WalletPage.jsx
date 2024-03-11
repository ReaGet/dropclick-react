import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import { useLocation } from 'react-router-dom';
import { Navbar } from 'components/Navbar';
import axios from 'axios';

import { useTranslation } from 'react-i18next';

const WalletPage = () => {

    let { state } = useLocation();

    const {isAuth, email} = useAuth();
  
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isAuth) {
        navigate('/login');
      }
      if (!state) {
        navigate('/');
      }
    });
  
    const { t } = useTranslation();

    const [date, setDate] = useState();

    useEffect(() => {
      axios
        .post("https://dropclick.pro/base/getSubs.php", {
          email: email
        })
        .then(res => {
          setDate(res.data);
        })
    }, [isAuth])

    const [pay, setPay] = useState('40$');

    const handle = (event) => {
      setPay(event.target.value);
    }


    const [dann, setDann] = useState();

    useEffect(() => {
      axios
        .post("https://dropclick.pro/base/getPay.php", {
          email: email
        })
        .then(res => {
          setDann(res.data);
        })
    }, [isAuth])

  return (
    <div>
        <Navbar email={email} wallet={state} />
        <div className='container'>
            <div style={{marginTop: '25px', border: '1px solid white', borderRadius: '15px', padding: '30px', backgroundColor: '#1d1e23'}}>
            <h3>{t("Payment and subscriptions")}</h3>
            <p>{t("The subscription allows you to get unlimited access to the site materials. We provide several tariff plans to choose from. No subscription is available.")}</p>
            <div className='row mt-5'>
              <div className='col-6' style={{textAlign: 'center'}}>
                <p>{t("Subscription payment date")}:</p>
              </div>
              <div className='col-6' style={{textAlign: 'center'}}>
                {
                  date ? date.map(dat => (
                    <input type="date" value={dat.nach} readOnly />
                  )) : <input type="text" value="Нет данных" readOnly />
                }
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-6' style={{textAlign: 'center'}}>
                <p>{t("Subscription end date")}:</p>
              </div>
              <div className='col-6' style={{textAlign: 'center'}}>
                <div>
                {
                  date ? date.map(dat => (
                    <input type="date" value={dat.date} readOnly />
                  )) : <input type="text" value="Нет данных" readOnly />
                }
                </div>
              </div>
            </div>
            <div style={{textAlign: 'center'}}>
              <button className='btn btn-outline-success mt-4 mb-4' data-bs-target="#exampleModalToggle" data-bs-toggle="modal">{t("Buy a subscription")}</button>
            </div>
            </div>
        </div>
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
        <div className="modal-body" style={{textAlign: 'center', padding: '35px'}}>
                <h1 className='mb-4'>{t("Making a subscription")}</h1>
                <p className='mb-5'>{t("For unlimited access to the site materials, you must pay for a subscription.")}</p>
                <h3 className='mb-4'>{t("Choose a tariff")}:</h3>
                  <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value="40$" checked={pay === "40$"} onChange={handle}/>
                  <label className="btn btn-outline-success" htmlFor="btnradio1" style={{marginRight: '15px'}}>
                    <div className='row' style={{padding: '10px'}}>
                      <div className='col-8'>
                        <p style={{margin: '0'}}>{t("Month")}</p> 
                      </div>
                      <div className='col-4'>
                        <p style={{margin: '0'}}>40$</p>
                      </div>
                    </div>
                  </label>

                  <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" value="110$" checked={pay === "110$"} onChange={handle}/>
                  <label className="btn btn-outline-success" htmlFor="btnradio2" style={{marginRight: '15px'}}>
                  <div className='row' style={{padding: '10px'}}>
                      <div className='col-8'>
                        <p style={{margin: '0'}}>{t("Three months")}</p> 
                      </div>
                      <div className='col-4'>
                        <p style={{margin: '0'}}>110$</p>
                      </div>
                    </div>
                  </label>

                  <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autocomplete="off" value="200$" checked={pay === "200$"} onChange={handle}/>
                  <label className="btn btn-outline-success" htmlFor="btnradio3">
                  <div className='row' style={{padding: '10px'}}>
                      <div className='col-8'>
                        <p style={{margin: '0'}}>{t("Half a year")}</p> 
                      </div>
                      <div className='col-4'>
                        <p style={{margin: '0'}}>200$</p>
                      </div>
                    </div>
                  </label>
                  <div className='row mt-5'>
                    <div className='col-6'>
                      <h4>{t("To be paid")}:</h4>
                    </div>                  
                    <div className='col-6'>
                      {pay}
                    </div>                  
                </div>
              </div>
      <div className="modal-footer">
        <button className="btn btn-outline-success" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">{t("To pay")}</button>
      </div>
    </div>
  </div>
</div>
<div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body" style={{textAlign: 'center', padding: '35px'}}>
        <div>
          <p className='mb-1'>{t("Wallet address")}</p>
          {
            dann ? dann.map(dan => (
              <input type="text" value={dan.adress} readOnly style={{width: '100%', textAlign: 'center'}} />
            )): <input type="text" value="Нет данных" readOnly style={{width: '100%', textAlign: 'center'}} />
          }
        </div>
        <div>
        <p className='mb-1 mt-3'>{t("Translation Network")}</p>
        {
            dann ? dann.map(dan => (
              <input type="text" value={dan.perev} readOnly style={{textAlign: 'center'}} />
            )): <input type="text" value="Нет данных" readOnly style={{textAlign: 'center'}} />
          }
        </div>
        <div>
        <p className='mb-1 mt-3'>{t("Transfer amount")}</p>
          <input type="text" value={pay} readOnly style={{textAlign: 'center'}} />
        </div>
        <div className='mt-4'>
          <a href="http://t.me/dropclick_admin" target="_blank" rel="noopener noreferrer" className="btn btn-outline-success">{t("Paid")}</a>
        </div>
        <p className='mt-3'>{t("To activate your account, write to our manager in telegram by clicking the button above. We are already working on payment automation. We apologize.")}</p>
      </div>
    </div>
  </div>
</div>


    </div>
  )
}

export default WalletPage