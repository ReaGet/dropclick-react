import React, { useEffect, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { Layout } from "layouts/default";
import { GuideList } from "components/guide/GuideList";
import { Filters } from "components/Filters";
import GuideService from "services/GuideService";
import { useGuides } from "hooks/useGuides";

const HomePage = () => {
  const {isAuth, email} = useAuth();
  const [guides, setGuides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({
    sort: "",
    category: 0,
    search: "",
    done: false
  });

  const sortedAndSearchedGuides = useGuides(guides, filter.sort, filter.search);

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
        <div className="flex flex-col gap-12 lg:pt-32 text-white">
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
        <GuideList guides={sortedAndSearchedGuides}/>
      </div>
    </Layout>
  )
}

export default HomePage