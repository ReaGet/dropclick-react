import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/use-auth';
import { Navbar } from 'components/Navbar';
import { Cards } from 'components/Cards';
import { Nav } from 'components/Nav';
import { Filtres } from 'components/Filtres';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import { Layout } from 'layouts/default';
import { GuideList } from 'components/GuideList';
import { Filters } from 'components/Filters';
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
  const { isAuth } = useAuth();
  const [filter, setFilter] = useState({ sort: "", category: 0 })


  const sortOptions = [
    { title: "Сначала новые", value: "New ones first" },
    { title: "Сначала старые", value: "The old ones first" },
    { title: "Сначала дешевле", value: "Cheaper at first" },
    { title: "Сначала дороже", value: "More expensive at first" },
  ];

  if (isAuth) {
    sortOptions.push({ title: "Избранные", value: "Favorites", authed: true, });
  }
  
  const categories = [
    { id: 0, name: "Все", selected: true },
    { id: 1, name: "ICO", selected: false },
    { id: 2, name: "Testnet", selected: false },
  ];

  // const [selectedSort, setSelectedSort] = useState(null);

  // const onSortChange = (newSortOption) => {
  //   setSelectedSort(
  //     sortOptions.find((sortOption) => sortOption.value === newSortOption.value)
  //   );
  // };

  // const categories = [
  //   { id: 0, name: "Все", selected: true },
  //   { id: 1, name: "ICO", selected: false },
  //   { id: 2, name: "Testnet", selected: false },
  // ];

  // const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // const onCategoryChange = (catgeoryId) => {
  //   setSelectedCategory(
  //     categories.find((category) => category.id === catgeoryId)
  //   );
  // };

  const { t } = useTranslation();

  const _guides = {
    "data": [
      {
        "id": 0,
        "title": "Space ID",
        "thumbnailUrl": "https://sun9-56.userapi.com/impg/frLzqphnL-x44GsYu0niYTDqDULfQnnHAa_EXA/w0gAQ1zD3N8.jpg?size=480x563&quality=95&sign=df00f9f41a37e981ab1a68323fc7f9a9&type=album",
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
        "thumbnailUrl": "https://sun9-12.userapi.com/impg/R__7t5t8Lyzfz4qVz8ji22RgtEsnbOyI4gM3Kg/gl9E4Jc7VXs.jpg?size=287x340&quality=95&sign=786ddefbce884333a87828b65a27ca59&type=album",
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
        "thumbnailUrl": "https://sun9-79.userapi.com/impg/cJugt4XqL8wX1cKQuudb6QeSZcMEuNLaICvRPA/43OEvy1siko.jpg?size=158x187&quality=95&sign=15407a34a96e2baf82732921118f584b&type=album",
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
        "thumbnailUrl": "https://sun9-11.userapi.com/impg/x1lH6M02DIu0Sp5Rjk0GP4xMLO4M4CF6sOXwXw/EIYFcsjLurs.jpg?size=248x306&quality=95&sign=7f3398f7448a188383c2a0d2ec36c0e4&type=album",
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

  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setGuides(_guides.data)
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Layout>
        <div className="container">
          <div className="flex flex-col gap-12 text-white">
            <ul className="flex gap-10 text-4xl xl:text-5xl text-primary font-bold">
              <li className="pb-3 border-b-[3px] border-current">Все</li>
            </ul>
            <Filters
              filter={filter}
              setFilter={setFilter}
              sortOptions={sortOptions}
              categories={categories}
            />
          </div>
          {/* <Filtres razdel={razdel} handleChange={handleChange} isChecked={isChecked} handleChangeSort={handleChangeSort} sort={sort} isAuth={isAuth} /> */}
          <GuideList guides={guides}/>
        </div>
      </Layout>
    </>
  )
}

export default HomePage