import { Link } from "react-router-dom"
import { RingProgress } from "../ui/RingProgress";

export const GuideCard = ({ guide }) => {
  const getProgress = () => (parseInt(guide.progress) || 0).toFixed();

  const handleFavoriteClick = (event) => {
    event.preventDefault();
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

            <button className="rounded-full" onClick={handleFavoriteClick}>
              {
                guide.isFavorite
                  ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.2894 19.5612L4.37883 12.6928C3.8633 12.1844 3.45346 11.5761 3.17359 10.9038C2.89372 10.2316 2.74951 9.50913 2.74951 8.77924C2.74951 8.04935 2.89372 7.32688 3.17359 6.65464C3.45346 5.9824 3.8633 5.37405 4.37883 4.86564C5.35223 3.90596 6.63422 3.33592 7.98865 3.26052C9.34308 3.18512 10.6787 3.60944 11.7495 4.45532C12.8203 3.60944 14.1559 3.18512 15.5104 3.26052C16.8648 3.33592 18.1468 3.90596 19.1202 4.86564C19.6357 5.37405 20.0456 5.9824 20.3254 6.65464C20.6053 7.32688 20.7495 8.04935 20.7495 8.77924C20.7495 9.50913 20.6053 10.2316 20.3254 10.9038C20.0456 11.5761 19.6357 12.1844 19.1202 12.6928L12.2096 19.5612C12.0866 19.6835 11.9212 19.752 11.7491 19.752C11.5769 19.752 11.4116 19.6835 11.2885 19.5612H11.2894Z" fill="#ECCF4D"/>
                    </svg>
                  )
                  : (
                    <svg className="fill-white" width="24" height="24">
                      <use xlinkHref="/assets/icons/sprites.svg#favorite"></use>
                    </svg>
                  )
              }
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-1 flex-col">
            <h2 className="text-2xl leading-[1.5rem] font-semibold">{ guide.title }</h2>

            <p className="mt-6 text-base text-[#cdcdcd] line-clamp-3">Pyth предоставляет рыночные данные в реальном времени финансовым приложениям dApps на 40+ блокчейнах</p>

            <div className="flex flex-col mt-auto text-lg xl:text-xl whitespace-nowrap">
              <div className="mt-4">
                Время: <span className="ml-2 text-primary">{ guide.time } мин</span>
              </div>

              <div>
                Вложения: <span className="ml-2 text-primary">
                  {/* { parseInt(guide?.price?.toString() || '') ? `$${guide.price}` : "Бесплатно" } */}
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
              scoreTextClassname={"mt-4 text[9px] leading-[8px] font-semibold"}
              labelText={(value) => "млн"}
              labelTextClassname={"text[7px] leading-[8px] font-semibold"}
            ></RingProgress>

            <RingProgress
              value={guide.twitter_score}
              maxValue={100}
              width={50}
              smooth={true}
              scoreTextClassname={"mt-4 text[9px] leading-[8px] font-semibold"}
              labelText={() => "TS"}
              labelTextClassname={"text[7px] leading-[8px] font-semibold"}
            ></RingProgress>
          </div>
        </div>
      </Link>
      
    </article>
  )
};