import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { MdStarRate } from "react-icons/md";
import axios from 'axios';
import useLocalStorage from 'hooks/use-localstorage';
import { useTranslation } from 'react-i18next';
import { FaFire } from "react-icons/fa6";
import { GiProfit } from "react-icons/gi";
import { BsStopwatch } from "react-icons/bs";

const Card = (props) => {

    const {
        title,
        description,
        raz,
        time,
        money,
        img,
        invest,
        tw,
        fire,
        whath,
        stong,
        handleStar,
        isAuth,
        email,
        star
    } = props;

    const [language, setLanguage] = useLocalStorage('language', 'ru');

    const [favor, setFavor] = useState('');

        useEffect(() => {
            axios
              .post("https://dropclick.pro/base/getFavor.php", {
                email: email,
                name: title
              })
              .then(res => {
                setFavor(res.data);
              })
        }, [isAuth, star])

    const [count, setCount] = useState('');

    useEffect(() => {
        if (language === 'en') {
          axios
          .post("https://dropclick.pro/base/getProgres.php", {
            name: title
          })
          .then(res => {
            setCount(res.data);
          })
        } else if (language === 'ru') {
          axios
          .post("https://dropclick.pro/base/getProgresRU.php", {
            name: title
          })
          .then(res => {
            setCount(res.data);
          })
        }
    }, [isAuth])


    const [prog, setProg] = useState('');

        useEffect(() => {
            axios
              .post("https://dropclick.pro/base/getProg.php", {
                email: email,
                name: title
              })
              .then(res => {
                setProg(res.data);
              })
        }, [isAuth])


        function isWhatPercentOf(x, y) {
            return (x / y) * 100;
          }

          const { t } = useTranslation();
          

  return (
        <div className="card">
            <div className='text-end fs-1 inputs' style={{zIndex: '1', marginTop: '-50px'}}>

                {stong != false ? <GiProfit style={{marginBottom: '-70px', marginRight: '5px', backgroundColor: '#1c1d21', borderRadius: '100%', padding: '5px', border: '1px solid green', color: 'green'}} /> : <></>}
                {whath != false ? <BsStopwatch  style={{marginBottom: '-70px', marginRight: '5px', backgroundColor: '#1c1d21', borderRadius: '100%', padding: '5px', border: '1px solid red', color: 'red'}} /> : <></>}
                {fire != false ? <FaFire style={{marginBottom: '-70px', marginRight: '5px', backgroundColor: '#1c1d21', borderRadius: '100%', padding: '5px', border: '1px solid orange', color: 'orange'}} /> : <></>}

                {isAuth ? 
                <input type="checkbox" className="btn-check" id={title} value={title} autoComplete="off" onChange={handleStar} checked={favor} /> 
                : <></>}
                <label htmlFor={title}><MdStarRate style={{marginBottom: '-70px', marginLeft: '20px', backgroundColor: '#1c1d21', borderRadius: '100%', padding: '5px', border: '1px solid white', cursor: 'pointer'}} /></label>
            </div>
        <Link to='/guide' state={{title, time, money, img}} style={{textDecoration: 'none'}}>
            <div className="container-card bg-green-box">
                <div className='row'>
                    <div className='col-8'>
                        <i style={{border: '2px solid #1d1e23', padding: '5px 17px', fontSize: '11px', borderRadius: '10px', color: 'white', fontStyle: 'normal'}}>{raz}</i>
                        <p className="card-title">{title}</p>
                        <p className="card-description">{description}</p>
                        <p className='mb-0' style={{color:'white', fontSize: '14px'}}>{t("Time")}: <span style={{color: '#e7ce50', fontSize: '12px'}}>{time}</span></p>
                        <p style={{color:'white', fontSize: '14px'}}>{t("Attachments")}: <span style={{color: '#e7ce50', fontSize: '12px'}}>{money}</span></p>
                        <div className='row'>
                            <div className='col-6'>
                                <p style={{margin: 0, color:'white', fontSize: '10px', marginBottom: '6px'}}>{t("Progress")}:</p>
                            </div>
                            <div className='col-6'>
                                <p style={{margin: 0, color:'white', fontSize: '10px', marginBottom: '6px', textAlign: 'end'}}>{prog != 0 ? isWhatPercentOf(prog, count).toFixed() + '%' : "0%"}</p>
                            </div>
                        </div>
                        <div className="progress" style={{height:'18px'}} role="progressbar" aria-label="Success example" aria-valuenow={isWhatPercentOf(prog, count) + '%'} aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar bg-success" style={{width: isWhatPercentOf(prog, count) + '%'}}></div>
                        </div>
                    </div>
                    <div className='col-4 align-self-end'>
                            <img src={img} width={120} height={125} alt=""/>
                        <div className='row' style={{justifyContent: 'center'}}>
                            <div className='col-6' id='litl' style={{border: '1px solid white', padding: '5px', textAlign: 'center', borderRadius: '10px', margin: '0', width: '50px', marginRight: '4px'}}>
                                <p className='mb-0' id='litltext'>{invest}</p>
                                <p style={{fontSize: '8px', margin: '0'}}>{t("mln")}</p>
                            </div>
                            <div className='col-6' id='litl' style={{border: '1px solid white', padding: '5px', textAlign: 'center', borderRadius: '10px', margin: '0', width: '50px', borderTop: '0'}}>
                                <div className="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '2px'}}>
                                    <div className="progress-bar bg-success" style={{width: parseInt(tw) + '%'}}></div>
                                </div>
                                <p id='litltext' style={{margin: '0'}}>{tw}</p>
                                <p style={{fontSize: '8px', margin: '0'}}>TW</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        </div>
  )
}

export  {Card}