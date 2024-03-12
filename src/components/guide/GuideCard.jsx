import { Link } from "react-router-dom"
import { TwitterScore } from "../ui/TwitterScore";

export const GuideCard = ({ guide }) => {
  const prog = ~~(Math.random() * 100),
    count = 100;
  // const getProgress = (current, total) => (current / total * 100).toFixed();
  const getProgress = () => (parseInt(guide.progress) || 0).toFixed();

  return (
    <article
      className="p-8 text-white bg-[#15171C] rounded-2xl cursor-pointer sm:hover:scale-105 transition-transform duration-300"
    >
      <Link
        to={`/guide/${guide.id}`}
        className="flex flex-col gap-8"
      >
        <div className="flex gap-8 w-full">
          <div className="flex flex-col flex-grow gap-2">
            <div className="flex gap-4 text-lg xl:text-xl cursor-default">
              <span className="px-8 py-1 xl:px-10 xl:py-2 border border-[#414347] rounded-3xl">{ guide.category }</span>
            </div>

            <h2 className="mt-4 text-2xl font-semibold">"{ guide.title }"</h2>

            <span className="text-base text-[#A4B4C3]">3.41M participants</span>

            <div className="mt-4 text-xl whitespace-nowrap">
              Время: <span className="text-base text-primary">{ guide.time } мин</span>
            </div>

            <div className="text-xl whitespace-nowrap">
              Вложения: <span className="text-base text-primary">
                { parseInt(guide?.price.toString() || '') ? `$${guide.price}` : "Бесплатно" }
              </span>
            </div>
          </div>

          <div className="w-40 h-40 overflow-hidden rounded-2xl">
            <img
              className="w-full h-full object-cover"
              src={guide.thumbnailUrl}
              alt={guide.title}
              loading="lazy"
            />
          </div>
        </div>
      { guide.date }
        <div className="flex items-end gap-8">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between w-full px-2 text-base">
              <span>Прогресс:</span>
              <span>{ getProgress(prog, count) }%</span>
            </div>
            <div className="w-full h-8 bg-[#0F1114] rounded-lg">
              <div
                style={{width: `${getProgress(prog, count)}%`}}
                className="h-full bg-gradient-to-r from-[#ECCF4D] to-[#C2944E] rounded-lg"
              ></div>
            </div>
          </div>

          <TwitterScore
            score={guide.twitter_score}
            width={100}
            smooth={true}
            showLabelText={false}
            className="ml-auto"
          ></TwitterScore>
        </div>
      </Link>
      
    </article>
  )
};