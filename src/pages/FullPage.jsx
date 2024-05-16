import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Layout } from "layouts/default";
import { RingProgress } from "components/ui/RingProgress";
import { useAuth } from "hooks/useAuth";
import GuideService from "services/GuideService";
import { FavoriteButton } from "components/ui/FavoriteButton";
import { GuideLinks } from "components/guide/GuideLinks";
import { ScrollToTop } from "components/ScrollTop";
import { TaskList } from "components/guide/TaskList";
import { SubscribitionModal } from "components/modals/SubscribitionModal";

const FullPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [guide, setGuide] = useState({});
  const [descExpanded, setDescExpanded] = useState(false);
  const [isLongContent, setIsLongContent] = useState(false);
  const [isFavorite, setIsFavorite] = useState(guide.isFavorite);
  const [doneTasks, setDoneTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isFinished = false;
  // const isFinished = Math.random() > 0.5;

  const navigate = useNavigate();

  useEffect(() => {
    setIsLongContent(
      (guide.content?.length || 0) > 425
    );
  }, [guide]);

  useEffect(() => {
    try {
      GuideService.getById({ email: user.email, guideId: id }, true).then((result) => {
        if (Array.isArray(result)) {
          navigate("/");
          return;
        }
        setIsFavorite(result.isFavorite);
        setDoneTasks(result.tasks.reduce((_doneTasks, { id, isDone }) => {
          _doneTasks[id] = isDone;
          return _doneTasks;
        }, {}));
        setGuide(result);
      });
    } catch(e) {
      console.log("Error while fetching guide:", e)
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

  const onPermissionError = () => {
    setIsModalOpen(true);
  }

  return (
    <Layout>
      <ScrollToTop />
      <main className="-mt-28 md:-mt-40 text-white">
        <div className="flex items-center justify-center w-full h-[250px] mb-16 bg-[#000000] bg-[radial-gradient(#332F1F_1px,transparent_1px)] [background-size:2rem_2rem]">
          <div className="w-56 h-56 rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
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

              <div className="flex flex-wrap gap-8 mt-8 text-lg text-white select-none whitespace-nowrap">
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

                { isFinished && (
                  <div className="flex items-center gap-4 px-6 py-3 bg-[#0D0600] border border-[#4F3015] rounded-xl cursor-default uppercase">
                    Завершен
                  </div>
                )}
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

          <div className="w-full h-[1px] my-8 bg-[#2E2E2E]"></div>

          <TaskList
            isFinished={isFinished}
            guideTitle={guide.title}
            tasks={guide.tasks}
            onPermissionError={onPermissionError}
          />

        </div>
      </main>

      <SubscribitionModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  )
}

export default FullPage;