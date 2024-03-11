import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import { useLocation } from 'react-router-dom';
import { Navbar } from 'components/Navbar';
import axios from 'axios';

import { CiCircleChevLeft } from "react-icons/ci";
import { Infos } from 'components/Infos';
import { Description } from 'components/Description';
import { Accordion } from 'components/Accordion';
import { Accord } from 'components/Accord';

import { useTranslation } from 'react-i18next';
import useLocalStorage from 'hooks/use-localstorage';

const FullPage = () => {

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


  const [language, setLanguage] = useLocalStorage('language', 'ru');
  
  const [full, setFull] = useState();

  useEffect(() => {
    if (language === 'en') {
      axios
      .post("https://dropclick.pro/base/getGuid.php", {
        prop: state.title
      })
      .then(res => {
        setFull(res.data);
      })
    } else if (language === 'ru') {
      axios
      .post("https://dropclick.pro/base/getGuidRU.php", {
        prop: state.title
      })
      .then(res => {
        setFull(res.data);
      })
    }
}, [])


const [subs, setSubs] = useState();

useEffect(() => {
  axios
    .post("https://dropclick.pro/base/getSubs.php", {
      email: email
    })
    .then(res => {
      setSubs(res.data);
    })
}, [isAuth])



  const [guid, setGuid] = useState();

  useEffect(() => {
    if (language === 'en') {
      axios
      .post("https://dropclick.pro/base/getInstr.php", {
        name: state.title
      })
      .then(res => {
        setGuid(res.data);
      })
    } else if (language === 'ru') {
      axios
      .post("https://dropclick.pro/base/getInstrRU.php", {
        name: state.title
      })
      .then(res => {
        setGuid(res.data);
      })
    }
}, [])


const [sub, setSub] = useState();

useEffect(() => {
  axios
    .post("https://dropclick.pro/base/getSub.php", {
      email: email
    })
    .then(res => {
      setSub(res.data);
    })
}, [isAuth])

const { t } = useTranslation();

  return (
    <div>
      <Navbar email={email} />
      <div className='container'>
        <div className='mt-5 mb-5'>
          <Link type="button" className="btn btn-outline-success" to="/" style={{fontSize: '20px'}}><CiCircleChevLeft style={{fontSize: '25px', paddingBottom: '3px'}} /> {t("Back to main page")}</Link>
        </div>
        <div className='row'>
          <div className='col-6'>
            <img src={state.img} alt="" width={200} height={200} style={{borderRadius: '15px'}} />
          </div>
          <div className='col-6' id='mar'>
            <Infos full={full} />
            <div className='row' style={{marginLeft: '4px'}}>
              <div className='col-3' id='time'>{state.time}</div>
              <div className='col-3' id='money'>{state.money}</div>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div className='container mt-5'>
          <Description full={full}/>
        </div>
        <div>
            {sub?.length > 0 ? sub.map(su => (
                <Accordion guid={guid} date={su.date} />
            )) : <Accord guid={guid} />
            }
            
        </div>
      </div>
    </div>
  )
}

export default FullPage