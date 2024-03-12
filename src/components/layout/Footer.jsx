export const Footer = () => {
  return (
    <footer className="pt-24 pb-12">
      <div className="container flex flex-col md:flex-row justify-between gap-12 pt-20 border-t border-[#15171C] divide-y divide-gray md:divide-none">
        <div className="flex flex-col items-start gap-8 text-2xl text-white">
          <a className="mb-2 text-3xl font-semibold [&.js-active]:text-bold" href="/">Главная</a>
          <a className="[&.js-active]:text-bold" href="/#about">О сервисе</a>
          <a className="[&.js-active]:text-bold" href="https://dropclick.pro/results/">Результаты</a>
          <a className="[&.js-active]:text-bold" href="/#how">Как это работает?</a>
          <a className="[&.js-active]:text-bold" href="/#contacts">Контакты</a>
        </div>

        <div id="contacts" className="flex flex-col gap-10 pt-12 md:pt-0">
          <span className="text-3xl text-white font-semibold">Наши соц.сети:</span>

          <div className="flex gap-6">
            <a href="https://t.me/dropclick" target="_blank"
              className="flex items-center justify-center w-16 h-16 bg-primary rounded-full">
              <svg width="27" height="27">
                <use xlinkHref="/assets/icons/sprites.svg#tg"></use>
              </svg>
            </a>
            <a href="https://www.youtube.com/channel/UCKHXMlkZIK6B1RHrAhF-4nQ" target="_blank"
              className="flex items-center justify-center w-16 h-16 bg-primary rounded-full">
              <svg width="27" height="27">
                <use xlinkHref="/assets/icons/sprites.svg#yt"></use>
              </svg>
            </a>
          </div>

          <span className="text-2xl text-white">Ⓒ 2024 Все права защищены.<br />DROPCLICK</span>
        </div>
      </div>
    </footer>
  )
}