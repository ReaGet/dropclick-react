import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { ProfileDropdown } from "./header/ProfileDropdown";
import useClickOutside from "hooks/useClickOutside";

export const Header = () => {
  const [isNavOpened, setNavOpened] = useState(false);
  const rootRef = useRef(null);
  const { user } = useAuth();
  const location = useLocation();

  useClickOutside(rootRef, () => {
    setNavOpened(false);
  });

  return (
    <header className="group fixed w-full top-0 bg-[#0B0B0B] md:bg-black border border-[#191919] md:border-none rounded-b-2xl z-20">
      <div className="container flex items-center md:justify-between flex-wrap gap-8 sm:gap-10 md:gap-0 py-6 md:py-14">
        <Link className="mr-auto md:mr-0 text-4xl text-white font-semibold" to="/">
          DROP<span className="text-primary">CLICK</span>
        </Link>

        <div
          ref={rootRef}
          className={[
            "absolute md:relative md:flex flex-col md:flex-row flex-1 items-center gap-12 w-full p-8 md:p-0 left-0 top-28 md:top-0 bg-[#0B0B0B] md:bg-transparent",
            (isNavOpened ? "flex" : "hidden")
          ].join(" ")}
        >
          <nav
            className="flex flex-col md:flex-row flex-1 items-center justify-center gap-8 lg:gap-16 text-2xl md:text-[13px] lg:text-[14px] text-[#e4e4e4]"
          >
            <a className={[
              "[&.js-active]:text-primary [&.js-active]:font-semibold hover:text-primary transition-colors",
              location.pathname === "/" ? "js-active" : "",
            ].join(" ")} href="/">Главная</a>
            <a className="[&.js-active]:text-primary [&.js-active]:font-semibold hover:text-primary transition-colors" href="https://dropclick.pro/#about">О сервисе</a>
            <a className="[&.js-active]:text-primary [&.js-active]:font-semibold hover:text-primary transition-colors" href="https://dropclick.pro/results/">Результаты</a>
            <a className="[&.js-active]:text-primary [&.js-active]:font-semibold hover:text-primary transition-colors" href="https://dropclick.pro/#how">Как это работает?</a>
            <a className="[&.js-active]:text-primary [&.js-active]:font-semibold hover:text-primary transition-colors" href="https://dropclick.pro/#contacts">Контакты</a>
          </nav>

          {!user && (
            <div className="flex items-center gap-8 text-2xl md:text-xl lg:text-[14px] text-white">
              <Link className="button-outline px-6 py-4 rounded-full" to="/login">Войти</Link>
            </div>
          )}
          
          { location.pathname !== "/" && <Link className="button-outline md:hidden px-6 py-4 rounded-full text-2xl md:text-xl lg:text-[14px] text-white" to="/">Перейти в агрегатор</Link> }
        </div>

        {user && (
          <div className="flex items-center gap-6 text-white">
            { location.pathname !== "/" && <Link className="button-outline hidden md:flex px-6 py-4 rounded-full text-2xl md:text-xl" to="/">Перейти в агрегатор</Link> }
            <ProfileDropdown></ProfileDropdown>
          </div>
        )}

        <button
          ref={rootRef}
          className="flex md:hidden items-center justify-center w-16 h-16 text-white active:text-primary border border-current rounded-lg"
          onClick={() => setNavOpened(!isNavOpened)}
        >
          <svg className="stroke-current" width="24" height="24">
            <use xlinkHref="/assets/icons/sprites.svg#burger"></use>
          </svg>
        </button>
      </div>
    </header>
  );
};