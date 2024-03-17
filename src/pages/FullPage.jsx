import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Layout } from 'layouts/default';
import { RingProgress } from 'components/ui/RingProgress';
import GuideService from 'services/GuideService';
import { useAuth } from 'hooks/useAuth';

const FullPage = () => {
  const { id } = useParams();
  console.log(id)

//   let { state } = useLocation();

//   const {isAuth, email} = useAuth();

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuth) {
//       navigate('/login');
//     }
//     if (!state) {
//       navigate('/');
//     }
//   });


//   const [language, setLanguage] = useLocalStorage('language', 'ru');
  
//   const [full, setFull] = useState();

//   useEffect(() => {
//     if (language === 'en') {
//       axios
//       .post("https://dropclick.pro/base/getGuid.php", {
//         prop: state.title
//       })
//       .then(res => {
//         setFull(res.data);
//       })
//     } else if (language === 'ru') {
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
//     if (language === 'en') {
//       axios
//       .post("https://dropclick.pro/base/getInstr.php", {
//         name: state.title
//       })
//       .then(res => {
//         setGuid(res.data);
//       })
//     } else if (language === 'ru') {
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

  const _guide = {
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
  }
  const [guide, setGuide] = useState({});
  const [descExpanded, setDescExpanded] = useState(false);
  const [isLongContent, setIsLongContent] = useState(false);

  useEffect(() => {
    setIsLongContent(
      (guide.content?.length || 0) > 425
    );
  }, []);

  useEffect(() => {
    try {
      GuideService.getById({ email: user.email, guideId: id }).then((result) => {
        console.log(result)
        setGuide(result);
      });
    } catch(e) {
      console.log("Error:", e)
    }
  }, []);

  return (
    <Layout>
      <main className="text-white">
        <div className="w-full h-[250px] mb-16 bg-[#000000] bg-[radial-gradient(#332F1F_1px,transparent_1px)] [background-size:2rem_2rem]">
        </div>
        <div className="container flex flex-col gap-16 text-white">
          <div className="flex text-xl text-primary hover:text-primary-hover">
            <Link to="/" className="flex items-center gap-6">
              <svg className="fill-current rotate-180" width="24" height="24">
                <use xlinkHref="/assets/icons/sprites.svg#arrow-long"></use>
              </svg>
              Назад к гайдам
            </Link>
          </div>

          <section className="flex items-start gap-16">
            <div className="flex flex-col flex-grow">
              <div className="flex items-end gap-6">
                <h1 className="text-[4rem] leading-[3.6rem] font-bold">{ guide.title }</h1>
                <span className="text-3xl leading-[1.875rem] text-[#666666]">{ guide.date }</span>

                {/* <div className="ml-auto" v-if="guide?.links">
                  links
                </div> */}
              </div>

              <div className="flex gap-8 mt-8 text-lg text-white select-none">
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

              <div className="flex flex-col items-center gap-4 mt-14 text-2xl">
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

            <div className="flex flex-col gap-12 shrink-0 w-[420px] min-h-[200px] p-10 bg-[#0D0D0D] rounded-3xl text-white">
              {
                guide?.twitter_score_url
                  ? (
                    <a
                      className="flex mr-auto text-3xl font-bold hover:text-primary-hover transition-colors"
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
                    <span className="flex mr-auto text-3xl font-bold">
                      Twitter score
                    </span>
                  )
              }
              
              <RingProgress
                value={guide?.twitter_score}
                maxValue={100}
                width={350}
                smooth={true}
                labelText={(value) => {
                  if (value < 50) return "Слабо";
                  if (value < 70) return "Средне";
                  return "Отлично";
                }}
              />
            </div>
          </section>

          {/* <UiDivider :className=s="'bg-[#2E2E2E]'" /> */}

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