import React from 'react'
import { Link } from 'react-router-dom';
import { BsBrowserChrome } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";

const Info = (props) => {

    const {
        name,
        date,
        website,
        twitter,
        discord,
        telegram
    } = props;

  return (
    <div>
        <p className='mb-2'>{date}</p>
        <h1 className='mb-3'>{name}</h1>
        <div className='row mb-3' style={{marginLeft: '4px'}}>
          {website ? 
            <div className='col-3' style={{border: '1px solid white', borderRadius: '10px', padding: '7px', textAlign: 'center'}}>
              <Link to={website} ><BsBrowserChrome style={{fontSize: '30px', color: 'white'}} /></Link>
            </div> : <></>
          }  
          {twitter ? 
            <div className='col-3' style={{border: '1px solid white', borderRadius: '10px', padding: '7px', textAlign: 'center'}}>
              <Link to={twitter} ><FaXTwitter style={{fontSize: '30px', color: 'white'}} /></Link>
            </div> : <></>
          }  
          {discord ? 
            <div className='col-3' style={{border: '1px solid white', borderRadius: '10px', padding: '7px', textAlign: 'center'}}>
              <Link to={discord} ><FaDiscord style={{fontSize: '30px', color: 'white'}} /></Link>
            </div> : <></>
          }  
          {telegram ? 
            <div className='col-3' style={{border: '1px solid white', borderRadius: '10px', padding: '7px', textAlign: 'center'}}>
              <Link to={telegram} ><FaTelegramPlane style={{fontSize: '30px', color: 'white'}} /></Link>
            </div> : <></>
          }  
        </div>
    </div>
  )
}

export  {Info}