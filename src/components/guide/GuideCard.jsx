import { Link } from "react-router-dom"
import { RingProgress } from "../ui/RingProgress";
import { FavoriteButton } from "components/ui/FavoriteButton";

export const GuideCard = ({ guide, onFavoriteChange, isFavoriteItem }) => {
  const getProgress = () => {
    const value = (parseInt(guide.progress) || 0).toFixed();
    return Math.max(0, Math.min(value, 100));
  }

  const handleFavoriteClick = async (event) => {
    event.preventDefault();
    onFavoriteChange(guide);
  };

  const isFinished = Math.random() > 0.5;

  return (
    <article
      className={[
        "p-8 text-white border rounded-2xl cursor-pointer sm:hover:scale-105 transition-transform duration-300",
        isFinished ? "bg-[#0D0600] border-[#4F3015]" : "bg-[#15171C] border-[#15171C]"
      ].join(" ")}
    >
      <Link
        to={`/guide/${guide.id}`}
        className="flex flex-col gap-8"
      >
        <div className="flex justify-between">
          <div className="py-3 px-5 xl:py-4 text-md xl:text-[12px] leading-[12px] font-bold border border-[#414347] rounded-3xl cursor-default">
            { guide.category }
          </div>

          { isFinished && (
            <div className="py-3 px-5 xl:py-4 mr-auto ml-5 text-md xl:text-[12px] text-[#FF7A00] leading-[12px] border border-[#4F3015] rounded-3xl cursor-default uppercase">
              Завершен
            </div>
          )}

          <div className="flex items-center gap-4">
            { guide.hit && (
              <svg className="cursor-default" width="26" height="26" onClick={e => e.preventDefault()}>
                <use xlinkHref="/assets/icons/sprites.svg#hit"></use>
              </svg>
            )}
            
            <FavoriteButton
              isFavorite={isFavoriteItem}
              width={20}
              height={20}
              onClick={handleFavoriteClick}
              className={"flex items-center justify-center w-[26px] h-[26px] border border-current rounded-full"}
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-1 flex-col">
            <h2 className="text-2xl leading-[1.5rem] font-semibold">{ guide.title }</h2>

            <p className="mt-6 text-base text-[#cdcdcd] line-clamp-3">{ guide.description }</p>

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
            <div className={[
              "w-full h-8 rounded-lg",
              isFinished ? "bg-black" : "bg-[#0F1114]"
            ].join(" ")}>
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