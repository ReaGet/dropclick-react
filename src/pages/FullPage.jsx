import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Layout } from "layouts/default";
import { RingProgress } from "components/ui/RingProgress";
import { useAuth } from "hooks/useAuth";
import GuideService from "services/GuideService";
import { FavoriteButton } from "components/ui/FavoriteButton";
import { GuideLinks } from "components/guide/GuideLinks";

const FullPage = () => {
  const { id } = useParams();

//   let { state } = useLocation();

//   const {isAuth, email} = useAuth();

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuth) {
//       navigate("/login");
//     }
//     if (!state) {
//       navigate("/");
//     }
//   });


//   const [language, setLanguage] = useLocalStorage("language", "ru");
  
//   const [full, setFull] = useState();

//   useEffect(() => {
//     if (language === "en") {
//       axios
//       .post("https://dropclick.pro/base/getGuid.php", {
//         prop: state.title
//       })
//       .then(res => {
//         setFull(res.data);
//       })
//     } else if (language === "ru") {
//       axios
//       .post("https://dropclick.pro/base/getGuidRU.php", {
//         prop: state.title
//       })
//       .then(res => {
//         setFull(res.data);
//       })
//     }
// }, [])


// const [subs, setSubs] = useState();

// useEffect(() => {
//   axios
//     .post("https://dropclick.pro/base/getSubs.php", {
//       email: email
//     })
//     .then(res => {
//       setSubs(res.data);
//     })
// }, [isAuth])



//   const [guid, setGuid] = useState();

//   useEffect(() => {
//     if (language === "en") {
//       axios
//       .post("https://dropclick.pro/base/getInstr.php", {
//         name: state.title
//       })
//       .then(res => {
//         setGuid(res.data);
//       })
//     } else if (language === "ru") {
//       axios
//       .post("https://dropclick.pro/base/getInstrRU.php", {
//         name: state.title
//       })
//       .then(res => {
//         setGuid(res.data);
//       })
//     }
// }, [])


// const [sub, setSub] = useState();

// useEffect(() => {
//   axios
//     .post("https://dropclick.pro/base/getSub.php", {
//       email: email
//     })
//     .then(res => {
//       setSub(res.data);
//     })
// }, [isAuth])

// const { t } = useTranslation();
  const { user } = useAuth();

  const [guide, setGuide] = useState({});
  const [descExpanded, setDescExpanded] = useState(false);
  const [isLongContent, setIsLongContent] = useState(false);
  const [isFavorite, setIsFavorite] = useState(guide.isFavorite);

  useEffect(() => {
    setIsLongContent(
      (guide.content?.length || 0) > 425
    );
  }, [guide]);

  useEffect(() => {
    try {
      GuideService.getById({ email: user.email, guideId: id }).then((result) => {
        setIsFavorite(result.isFavorite);
        setGuide(result);
      });
    } catch(e) {
      console.log("Error:", e)
    }
  }, []);

  const handleFavoriteClick = async (event) => {
    GuideService.setGuideFavorite({
      email: user.email,
      name: guide.title
    }).then(({ status = false }) => {
      setIsFavorite(status);
    });
  };

  return (
    <Layout>
      <main className="-mt-28 md:-mt-40 text-white">
        <div className="flex items-center justify-center w-full h-[250px] mb-16 bg-[#000000] bg-[radial-gradient(#332F1F_1px,transparent_1px)] [background-size:2rem_2rem]">
          <div className="w-56 h-56 rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src={guide.thumbnailUrl}
              alt={guide.title}
              loading="lazy"
            />
          </div>
        </div>

        <div className="container flex flex-col gap-16 text-white">
          <div className="flex text-lg lg:text-xl text-primary hover:text-primary-hover">
            <Link to="/" className="flex items-center gap-6">
              <svg className="fill-current rotate-180 w-8 h-8 lg:w-auto lg:h-auto" width="24" height="24">
                <use xlinkHref="/assets/icons/sprites.svg#arrow-long"></use>
              </svg>
              Назад к гайдам
            </Link>
          </div>

          <section className="flex flex-col md:flex-row items-start gap-16">
            <div className="flex flex-col flex-grow">
              <div className="flex items-start">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-2 md:gap-4">
                  <h1 className="text-4xl lg:text-[4rem] lg:leading-[3.6rem] font-bold">{ guide.title }</h1>
                  <span className="text-2xl lg:text-3xl leading-[1.875rem] text-[#666666]">{ guide.date }</span>
                </div>

                <div className="flex items-center gap-10 lg:gap-20 ml-auto">
                  <GuideLinks links={guide.links}/>
                  <FavoriteButton isFavorite={isFavorite} width={32} height={32} onClick={handleFavoriteClick} />
                </div>
              </div>

              <div className="flex gap-8 mt-8 text-lg text-white select-none whitespace-nowrap">
                <div className="flex items-center gap-4 px-6 py-3 bg-[#101010] rounded-xl cursor-default">
                  <svg className="stroke-current" width="18" height="18">
                    <use xlinkHref="/assets/icons/sprites.svg#time"></use>
                  </svg>
                  { guide?.time }
                </div>
                <div className="flex items-center gap-4 px-6 py-3 bg-[#101010] rounded-xl cursor-default">
                  <svg className="stroke-current" width="18" height="18">
                    <use xlinkHref="/assets/icons/sprites.svg#money"></use>
                  </svg>
                  { guide?.price }
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 mt-14 text-xl lg:text-2xl text-[#e4e4e4]">
                <div
                  className={[
                    "relative leading-snug overflow-hidden transition-all",
                    descExpanded ? "max-h-[1000px]" : "max-h-[170px]"
                  ].join(" ")}
                >
                  <div
                    className="guide__description"
                    dangerouslySetInnerHTML={{__html: guide?.content}}
                  ></div>

                  {isLongContent && (
                    <div
                      className={[
                        "absolute w-full h-14 bottom-0 bg-gradient-to-b from-transparent to-black transition-opacity",
                        descExpanded ? "opacity-0" : "",
                      ].join(" ")}
                    ></div>
                  )}
                </div>
                {isLongContent && (
                  <button
                    onClick={() => setDescExpanded(!descExpanded)}
                    className="mx-auto text-primary"
                  >
                    { (!descExpanded ? "Развернуть" : "Свернуть") }
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-8 lg:gap-12 shrink-0 w-full md:w-[350px] lg:w-[420px] min-h-[200px] p-10 bg-[#0D0D0D] rounded-3xl text-white">
              {
                guide?.twitter_score_url
                  ? (
                    <a
                      className="flex mr-auto text-2xl lg:text-3xl font-bold hover:text-primary-hover transition-colors"
                      href="#"
                      target="_blank"
                    >
                      Twitter score
                      <svg className="-mt-2 stroke-current" width="18" height="18">
                        <use xlinkHref="/assets/icons/sprites.svg#arrow-follow"></use>
                      </svg>
                    </a>
                  )
                  : (
                    <span className="flex mr-auto text-2xl lg:text-3xl font-bold">
                      Twitter score
                    </span>
                  )
              }
              
              <RingProgress
                value={guide?.twitter_score}
                maxValue={100}
                width={350}
                smooth={true}
                ringClassname={"w-full max-w-[320px] xs:max-w-full xs:w-auto"}
                scoreTextClassname={"text-[50px] font-semibold"}
                labelTextClassname={"text-[18px] leading-[8px] font-semibold"}
                labelText={(value) => {
                  if (value < 50) return "Слабо";
                  if (value < 70) return "Средне";
                  return "Отлично";
                }}
              />
            </div>
          </section>

          {/* <UiDivider :className=s=""bg-[#2E2E2E]"" /> */}

          <section className="flex w-full bg-[#0B0B0B] rounded-3xl overflow-hidden">
            <div className="flex flex-col gap-10 w-[380px] px-8 py-12">
              <button className="px-8 py-7 bg-[#111111] text-xl text-left rounded-3xl cursor-pointer">Получение тестовых токенов</button>
              <button className="px-8 py-7 bg-[#111111] text-xl text-left rounded-3xl cursor-pointer">Прохождение тестнета</button>
              <button className="px-8 py-7 bg-[#111111] text-xl text-left rounded-3xl cursor-pointer">Merkly - Создание контракта</button>
            </div>
            <div className="flex-grow min-h-full bg-[#111111]">

            </div>
          </section>

        </div>
      </main>
    </Layout>
  )
}

export default FullPage;