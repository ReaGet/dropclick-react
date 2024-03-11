import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/use-auth';
import { Navbar } from 'components/Navbar';
import { Cards } from 'components/Cards';
import { Nav } from 'components/Nav';
import { Filtres } from 'components/Filtres';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import { Header } from 'components/layout/Header';

const HomePage = () => {

  const {isAuth, email} = useAuth();

  const [star, setStar] = useState();

  const [razd, setRazd] = useState("all");

  const handleChange = (event) => {
    setRazd(event.target.value);
  };

  const [sort, setSort] = useState("New ones first");

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const isChecked = (value) => razd === value;


  const [cards, setCards] = useState();

  useEffect(() => {
    axios
      .post("https://dropclick.pro/base/getCard.php", {
        razd: razd,
        sort: sort,
        email: email
      })
      .then(res => {
        setCards(res.data);
      })
}, [razd, sort, star])

  const [razdel, setRazdel] = useState();

  useEffect(() => {
    fetch('https://dropclick.pro/base/getRaz.php')
      .then(res => res.json())
      .then(
        (result) => {
          setRazdel(result);
        }
      )      
    }, [])

    const handleStar = (event) => {
      axios
      .post("https://dropclick.pro/base/addStar.php", {
        email: email,
        name: event.target.value
      })       
      .then(() => {
        setStar(event.target.value);
      })
    };

    const { t } = useTranslation();

  return (
    <div>
      <Header />
      {/* {isAuth ? <Navbar email={email}/> : <Nav /> } */}
      <div className='container-fluid'>
        <div className='margin'>
          <div className='all'>
            <h1>{t('All')}</h1>
          </div>
          <Filtres razdel={razdel} handleChange={handleChange} isChecked={isChecked} handleChangeSort={handleChangeSort} sort={sort} isAuth={isAuth} />
          <div className='row'>
            <Cards cards={cards} handleStar={handleStar} isAuth={isAuth} email={email} star={star} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage