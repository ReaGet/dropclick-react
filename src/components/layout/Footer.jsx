export const Footer = () => {
  return (
    <footer class="pt-44 pb-12">
      <div class="container flex flex-col md:flex-row justify-between gap-12 divide-y divide-gray md:divide-none">
        <div class="flex flex-col items-start gap-8 text-3xl text-white">
          <a class="mb-4 text-4xl font-semibold [&.js-active]:text-bold" href="/">Главная</a>
          <a class="[&.js-active]:text-bold" href="/#about">О сервисе</a>
          <a class="[&.js-active]:text-bold" href="/results">Результаты</a>
          <a class="[&.js-active]:text-bold" href="/#how">Как это работает?</a>
          <a class="[&.js-active]:text-bold" href="/#contacts">Контакты</a>
        </div>

        <div id="contacts" class="flex flex-col gap-12 pt-12 md:pt-0">
          <span class="text-4xl text-white font-semibold">Наши соц.сети:</span>

          <div class="flex gap-6">
            <a href="https://t.me/dropclick" target="_blank"
              class="flex items-center justify-center w-[46px] h-[46px] bg-primary rounded-full">
              <svg width="27" height="27">
                <use xlinkHref="/assets/icons/sprites.svg#tg"></use>
              </svg>
            </a>
            <a href="https://www.youtube.com/channel/UCKHXMlkZIK6B1RHrAhF-4nQ" target="_blank"
              class="flex items-center justify-center w-[46px] h-[46px] bg-primary rounded-full">
              <svg width="27" height="27">
                <use xlinkHref="/assets/icons/sprites.svg#yt"></use>
              </svg>
            </a>
          </div>

          <span class="text-2xl text-white">Ⓒ 2024 Все права защищены.<br />DROPCLICK</span>
        </div>
      </div>
    </footer>
  )
}