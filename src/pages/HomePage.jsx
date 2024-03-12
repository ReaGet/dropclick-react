import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from 'hooks/use-auth';
import axios from 'axios';

import { Layout } from 'layouts/default';
import { GuideList } from 'components/guide/GuideList';
import { Filters } from 'components/Filters';
import GuideService from 'services/GuideService';

const HomePage = () => {

  const {isAuth, email} = useAuth();

  const [star, setStar] = useState();

  const [razd, setRazd] = useState("all");

//   const handleChange = (event) => {
//     setRazd(event.target.value);
//   };

  const [sort, setSort] = useState("New ones first");

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

  // useEffect(() => {
  //   fetch('https://dropclick.pro/base/getRaz.php')
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setRazdel(result);
  //       }
  //     )      
  //   }, [])

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
  // const { isAuth } = useAuth();

  const [guides, setGuides] = useState([]);
  const [filter, setFilter] = useState({
    sort: "",
    category: 0,
    search: "",
    done: false
  });
  const [categories, setCategories] = useState([]);

  const sortOptions = [
    { title: "Сначала новые", value: "date_desc" },
    { title: "Сначала старые", value: "date_asc" },
    { title: "Сначала дешевле", value: "price_asc" },
    { title: "Сначала дороже", value: "price_desc" },
  ];

  if (isAuth) {
    sortOptions.push({ title: "Избранные", value: "favorite", authed: true, });
  }

  useEffect(() => {
    GuideService.getCategories().then((result) => {
      setCategories([
        { id: 0, name: "Все", selected: true },
        ...result
      ]);
    });
  }, []);

  useEffect(() => {
    GuideService.getAll(email).then((result) => {
      setGuides(result);
    });
  }, []);

  return (
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
        <GuideList guides={guides}/>
      </div>
    </Layout>
  )
}

export default HomePage