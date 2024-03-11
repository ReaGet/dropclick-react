import { useState } from "react";

export const Header = () => {
  const [isNavOpened, setNavOpened] = useState(false);

  return (
    <header className="group fixed w-full top-0 _bg-[#0B0B0B] bg-white md:bg-black border border-[#191919] md:border-none rounded-b-2xl z-20">
      <div className="container flex items-center justify-between flex-wrap py-6 md:py-14">
        <a className="text-4xl text-white font-semibold" to="/">
          DROP<span className="text-primary">CLICK</span>
        </a>

        <div
          className={"absolute md:relative md:flex flex-col md:flex-row flex-1 items-center gap-12 w-full p-8 md:p-0 left-0 top-28 md:top-0 bg-[#0B0B0B] md:bg-transparent" + (isNavOpened ? "flex" : "hidden")}
        >
          <nav
            className="flex flex-col md:flex-row flex-1 items-center justify-center gap-8 lg:gap-16 text-2xl md:text-xl text-gray"
          >
            <a className="[&.js-active]:text-white hover:text-primary transition-colors" to="/">Главная</a>
            <a className="[&.js-active]:text-white hover:text-primary transition-colors" href="/#about">О сервисе</a>
            <a className="[&.js-active]:text-white hover:text-primary transition-colors" to="https://dropclick.pro/results/">Результаты</a>
            <a className="[&.js-active]:text-white hover:text-primary transition-colors" href="/#how">Как это работает?</a>
            <a className="[&.js-active]:text-white hover:text-primary transition-colors" href="/#contacts">Контакты</a>
          </nav>

          <div v-if="!user.isLoggedIn" className="flex items-center gap-8 text-2xl md:text-xl lg:text-[14px] text-white">
            <a href="https://app.dropclick.pro/login">Войти</a>
            <a className="button-outline px-6 py-4 rounded-full" to="/app">Перейти в агрегатор</a>
          </div>

          <div v-else className="flex gap-6">
            {/* <LayoutHeaderProfile />
            <LayoutHeaderNotifications /> */}
          </div>
        </div>

        <button
          className="flex md:hidden items-center justify-center w-16 h-16 text-[#666] active:text-primary border border-current rounded-lg"
          onClick="setNavOpened(!isNavOpened)"
        >
          <svg className="stroke-current" width="24" height="24">
            <use xlinkHref="/assets/icons/sprites.svg#burger"></use>
          </svg>
        </button>
      </div>
    </header>
  );
};