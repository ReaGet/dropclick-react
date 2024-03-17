import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { Layout } from "layouts/default";
import { GuideList } from "components/guide/GuideList";
import { Filters } from "components/Filters";
import GuideService from "services/GuideService";
import { useGuides } from "hooks/useGuides";

export const HomepageContext = createContext();

const HomePage = () => {
  const { user } = useAuth();
  const [guides, setGuides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isGuidesLoading, setIsGuidesLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [filter, setFilter] = useState({
    sort: "",
    category: { id: 0, name: "Все" },
    search: "",
    done: false
  });

  const sortedAndSearchedGuides = useGuides(guides, filter);

  const sortOptions = [
    { title: "Сначала новые", value: "date_desc" },
    { title: "Сначала старые", value: "date_asc" },
    { title: "Сначала дешевле", value: "price_asc" },
    { title: "Сначала дороже", value: "price_desc" },
  ];

  if (user) {
    sortOptions.push({ title: "Избранные", value: "favorite" });
  }

  useEffect(() => {
    setIsCategoriesLoading(true);
    GuideService.getCategories().then((result) => {
      setCategories([
        { id: 0, name: "Все" },
        ...result
      ]);
      setIsCategoriesLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsGuidesLoading(true);
    GuideService.getAll(user?.email).then((result) => {
      setGuides(result);
      setIsGuidesLoading(false);
    });
  }, []);

  return (
    <Layout>
      <HomepageContext.Provider value={{ isGuidesLoading, isCategoriesLoading }}>
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
          {
            sortedAndSearchedGuides.length > 0 || isGuidesLoading
              ? <GuideList
                  isGuidesLoading={isGuidesLoading}
                  guides={sortedAndSearchedGuides}
                />
              : <div className="flex flex-col items-center justify-center gap-12 pt-32 pb-8">
                  <svg className="fill-[#15171C]" width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-7 13h-2v-2h2v2zm0-4h-2V5h2v6z"/>
                  </svg>
                  <span className="text-2xl text-[#b3b3b3]">Гайды не найдены</span>
                </div>
          }
          
        </div>
      </HomepageContext.Provider>
    </Layout>
  )
}

export default HomePage