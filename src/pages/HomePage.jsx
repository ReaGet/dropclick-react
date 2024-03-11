import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/use-auth';
import { Navbar } from 'components/Navbar';
import { Cards } from 'components/Cards';
import { Nav } from 'components/Nav';
import { Filtres } from 'components/Filtres';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import { Header } from 'components/layout/Header';
import { Layout } from 'layouts/default';
import { GuideCard } from 'components/GuideCard';
// import { GuideCard } from 'components/GuideCard';

const HomePage = () => {

//   const {isAuth, email} = useAuth();

//   const [star, setStar] = useState();

//   const [razd, setRazd] = useState("all");

//   const handleChange = (event) => {
//     setRazd(event.target.value);
//   };

//   const [sort, setSort] = useState("New ones first");

//   const handleChangeSort = (event) => {
//     setSort(event.target.value);
//   };

//   const isChecked = (value) => razd === value;


//   const [cards, setCards] = useState();

//   useEffect(() => {
//     axios
//       .post("https://dropclick.pro/base/getCard.php", {
//         razd: razd,
//         sort: sort,
//         email: email
//       })
//       .then(res => {
//         setCards(res.data);
//       })
// }, [razd, sort, star])

//   const [razdel, setRazdel] = useState();

//   useEffect(() => {
//     fetch('https://dropclick.pro/base/getRaz.php')
//       .then(res => res.json())
//       .then(
//         (result) => {
//           setRazdel(result);
//         }
//       )      
//     }, [])

//     const handleStar = (event) => {
//       axios
//       .post("https://dropclick.pro/base/addStar.php", {
//         email: email,
//         name: event.target.value
//       })       
//       .then(() => {
//         setStar(event.target.value);
//       })
//     };

    const { t } = useTranslation();

  const guides = {
    "data": [
      {
        "id": 0,
        "title": "Space ID",
        "thumbnailUrl": "",
        "createdAt": "Fri Mar 08 2024 21:48:36 GMT+0300 (Москва, стандартное время)",
        "twitter_score": 100,
        "earned": 280,
        "invested": 10,
        "time": 30,
        "price": 100,
        "progress": 70,
        "content_short": "Tabi — модульный блокчейн L1, работающий на Cosmos и совместимый с EVM, нацелен на GameFi область",
        "content": "<a href=\"https://twitter.com/Tabichain\" target=\"_blank\" rel=\"noopener\">Tabi</a><span>&nbsp;— модульный блокчейн L1, работающий на Cosmos и совместимый с EVM. Нацелен блокчейн преимущественно на GameFi область. С&nbsp;развитием проекта в своем X (Twitter) команда&nbsp;<a href=\"https://x.com/Tabichain/status/1764531456062390556?s=20\" target=\"_blank\" rel=\"noopener\">сообщила</a>&nbsp;о проведении тестнета в Tabi Chain.</span>"
      },
      {
        "id": 1,
        "title": "Arbirtum",
        "thumbnailUrl": "project2",
        "createdAt": "Fri Mar 08 2024 21:48:36 GMT+0300 (Москва, стандартное время)",
        "twitter_score": 200,
        "earned": 10250,
        "invested": 50,
        "time": 2,
        "price": 2,
        "progress": 10,
        "content": "<a href=\"https://twitter.com/Tabichain\" target=\"_blank\" rel=\"noopener\">Tabi</a><span>&nbsp;— модульный блокчейн L1, работающий на Cosmos и совместимый с EVM. Нацелен блокчейн преимущественно на GameFi область. С&nbsp;развитием проекта в своем X (Twitter) команда&nbsp;<a href=\"https://x.com/Tabichain/status/1764531456062390556?s=20\" target=\"_blank\" rel=\"noopener\">сообщила</a>&nbsp;о проведении тестнета в Tabi Chain.</span><p>asdfasd ashdfkj ashkdfh asdhfajs dklfasdhf asjdfl ahdflk sd</p>"
      },
      {
        "id": 2,
        "title": "SUI",
        "thumbnailUrl": "project3",
        "createdAt": "Fri Mar 08 2024 21:48:36 GMT+0300 (Москва, стандартное время)",
        "earned": 1200,
        "invested": 45,
        "time": 60,
        "price": 0,
        "progress": 100,
        "content": "content"
      },
      {
        "id": 3,
        "title": "Space ID",
        "thumbnailUrl": "project4",
        "createdAt": "Fri Mar 08 2024 21:48:36 GMT+0300 (Москва, стандартное время)",
        "earned": 280,
        "invested": 10,
        "time": 2,
        "price": 0,
        "progress": 15,
        "content": "content"
      }
    ]
  }

  console.log(guides.data)
  return (
    <>
      <Layout>
        <div class="container">
          {/* {isAuth ? <Navbar email={email}/> : <Nav /> } */}
          <div className='margin'>
            <div className='all'>
              <h1>{t('All')}</h1>
            </div>
            {/* <Filtres razdel={razdel} handleChange={handleChange} isChecked={isChecked} handleChangeSort={handleChangeSort} sort={sort} isAuth={isAuth} /> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mt-16">
              { 
                guides.data.length
                  ? guides.data.map((guide) => <GuideCard key={guide.id} guide={guide}></GuideCard> )
                  : "Loading" 
              }
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default HomePage