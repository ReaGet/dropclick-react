import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { Layout } from "layouts/default";
import { GuideList } from "components/guide/GuideList";
import { Filters } from "components/Filters";
import GuideService from "services/GuideService";
import { useGuides } from "hooks/useGuides";
import { SubscribitionModalStatus } from "components/modals/SubscribitionModalStatus";
import { useLocation, Link } from "react-router-dom";

export const HomepageContext = createContext();

const HomePage = () => {
  const { user } = useAuth();
  const [guides, setGuides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isGuidesLoading, setIsGuidesLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [favoriteGuides, setFavoriteGuides] = useState({});
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [subscribitionStatus, setSubscribitionStatus] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);

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
    if (params.get("substatus")) {
      setIsSubModalOpen(true);
      setSubscribitionStatus(params.get("substatus"));
    }
  }, [location]);

  useEffect(() => {
    setIsCategoriesLoading(true);
    GuideService.getCategories().then((result) => {
      setCategories([
        { id: 0, name: "Все" },
        ...result
      ]);
      setIsCategoriesLoading(false);
    });

    setIsGuidesLoading(true);
    GuideService.getAll(user?.email).then((result) => {
      
      setFavoriteGuides(result.reduce((_favoriteGuides, {id, isFavorite}) => {
        _favoriteGuides[id] = isFavorite;
        return _favoriteGuides;
      }, {}));

      setGuides(result);
      setIsGuidesLoading(false);
    });
  }, []);

  const onFavoriteChange = (guide) => {
    GuideService.setGuideFavorite({
      email: user.email,
      name: guide.title
    }).then(({ status = false }) => {
      setFavoriteGuides({
        ...favoriteGuides,
        [guide.id]: status,
      });
    });
  };

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
                  onFavoriteChange={onFavoriteChange}
                  favoriteGuides={favoriteGuides}
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
      <SubscribitionModalStatus
        isModalOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
      >
        {
          subscribitionStatus === "expired"
            ? (
              <div className="flex flex-col gap-6 w-full max-w-[700px] sm:px-8 text-xl sm:text-2xl text-white text-center">
                <span>Ваша подписка истекла.</span>
                <span>Вы можете продлить её в <Link to="/account" className="text-primary">личном кабинете</Link></span>
              </div>
            ) : (
              <div className="flex flex-col gap-6 w-full max-w-[700px] sm:px-8 text-xl sm:text-2xl text-white text-center">
                <span>Для просмотра гайдов нужно приобрести подписку. </span>
                <span>Вы можете сделать это в <Link to="/account" className="text-primary">личном кабинете</Link></span>
              </div>
            )
        }
      </SubscribitionModalStatus>
    </Layout>
  )
}

export default HomePage