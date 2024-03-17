import { Link } from "react-router-dom"
import { RingProgress } from "../ui/RingProgress";
import { FavoriteButton } from "components/ui/FavoriteButton";

export const GuideCard = ({ guide, onFavoriteChange, isFavoriteItem }) => {
  const getProgress = () => (parseInt(guide.progress) || 0).toFixed();

  const handleFavoriteClick = async (event) => {
    event.preventDefault();
    onFavoriteChange(guide);
  };

  return (
    <article
      className="p-8 text-white bg-[#15171C] rounded-2xl cursor-pointer sm:hover:scale-105 transition-transform duration-300"
    >
      <Link
        to={`/guide/${guide.id}`}
        className="flex flex-col gap-8"
      >
        <div className="flex justify-between">
          <div className="py-3 px-5 xl:py-4 text-md xl:text-[12px] leading-[12px] font-bold uppercase border border-[#414347] rounded-3xl cursor-default">
            { guide.category }
          </div>

          <div className="flex items-center gap-4">
            { guide.hit && (
              <svg className="cursor-default" width="24" height="24" onClick={e => e.preventDefault()}>
                <use xlinkHref="/assets/icons/sprites.svg#hit"></use>
              </svg>
            )}
            
            <FavoriteButton isFavorite={isFavoriteItem} width={24} height={24} onClick={handleFavoriteClick} />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-1 flex-col">
            <h2 className="text-2xl leading-[1.5rem] font-semibold">{ guide.title }</h2>

            <p className="mt-6 text-base text-[#cdcdcd] line-clamp-3">Pyth предоставляет рыночные данные в реальном времени финансовым приложениям dApps на 40+ блокчейнах</p>

            <div className="flex flex-col mt-auto text-lg xl:text-xl whitespace-nowrap">
              <div className="mt-4">
                Время: <span className="ml-2 text-primary">{ guide.time }</span>
              </div>

              <div>
                Вложения: <span className="ml-2 text-primary">
                  { guide.price }
                </span>
              </div>
            </div>
          </div>
          <div className="shrink-0 w-44 h-56 rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={guide.thumbnailUrl}
              alt={guide.title}
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex items-end gap-16">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between w-full px-2 text-[9px] leading-[8px]">
              <span>Прогресс:</span>
              <span>{ getProgress() }%</span>
            </div>
            <div className="w-full h-8 bg-[#0F1114] rounded-lg">
              <div
                style={{width: `${getProgress()}%`}}
                className="h-full bg-gradient-to-r from-[#ECCF4D] to-[#C2944E] rounded-lg"
              ></div>
            </div>
          </div>

          <div className="flex gap-4">
            <RingProgress
              value={guide.invest || 0}
              maxValue={50}
              width={50}
              smooth={true}
              scoreTextClassname={"mt-4 text-[9px] leading-[8px] font-semibold"}
              labelText={(value) => "млн"}
              labelTextClassname={"text-[7px] leading-[8px] font-semibold"}
            ></RingProgress>

            <RingProgress
              value={guide.twitter_score}
              maxValue={100}
              width={50}
              smooth={true}
              scoreTextClassname={"mt-4 text-[9px] leading-[8px] font-semibold"}
              labelText={() => "TS"}
              labelTextClassname={"text-[7px] leading-[8px] font-semibold"}
            ></RingProgress>
          </div>
        </div>
      </Link>
      
    </article>
  )
};