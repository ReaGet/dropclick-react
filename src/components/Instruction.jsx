import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from 'hooks/use-auth';

import { useTranslation } from 'react-i18next';

const Instruction = (props) => {

    const {isAuth, email} = useAuth();

    const {
        title,
        instr,
        name,
        time
    } = props;


    function createMarkup() {
        return {__html: instr};
    }

    const [yes, setYes] = useState();

    const [done, setDone] = useState('');

    useEffect(() => {
        axios
          .post("https://dropclick.pro/base/getDone.php", {
            email: email,
            name: name,
            title: title
          })
          .then(res => {
            setDone(res.data);
          })
    }, [isAuth, yes])


    const handleDone = (event) => {
        axios
        .post("https://dropclick.pro/base/addDone.php", {
            name: name,
            title: event.target.value,
            email: email
        })       
        .then(() => {
            setYes(event.target.value);
        })
      };
      const today = new Date().toLocaleDateString("en-US");
      const last = new Date(time).toLocaleDateString("en-US");

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
    <div className="accordion-item">

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

        <h2 className="accordion-header">
        { 
                last > today ? 
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#' + title.replace(/[^a-zа-яё]/gi, '')} aria-expanded="false" aria-controls={title.replace(/[^a-zа-яё]/gi, '')}>
                    {title}
                </button> : <><button className="accordion-button collapsed" type="button" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
                    {title}
                </button></>
        }
        </h2>
        <div id={title.replace(/[^a-zа-яё]/gi, '')} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">
                <div className='instr' dangerouslySetInnerHTML={createMarkup()} />
                <div style={{textAlign: 'center'}}>
                <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" className="btn-check" id={title} autoComplete="off" value={title} checked={done} onChange={handleDone} />
                    <label className="btn btn-outline-success" htmlFor={title}>{t('Done')}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export {Instruction}