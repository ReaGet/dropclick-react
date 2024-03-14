import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutEmpty } from "layouts/empty";
import { useAuth } from "hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [refCode, setRefCode] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { success, data } = await login(email, password);

    if (!success) {
      setError({
        email: data.code === "auth/invalid-email",
        password: data.code === "auth/invalid-credential",
      });
    } else {
      setError({
        email: "",
        password: "",
      });
    }
  };

  return (
    <LayoutEmpty>
      <div className="container flex items-center justify-center min-h-screen text-white">
        <div className="flex flex-col gap-28 w-full max-w-[600px] min-h-[400px] px-20 py-8 bg-[#0B0B0B] rounded-3xl">
          <div className="flex flex-col items-center">
            <div className="mt-28 text-5xl">Регистрация</div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-12">
            <label className="flex flex-col w-full" htmlFor="email">
              <input
                className="w-full p-7 text-2xl placeholder:text-white rounded-xl bg-[#15171C] outline-none"
                id="email"
                type="text"
                placeholder="Логин"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              />
              { error.email && <span className="mt-2 text-xl text-red-500">Неправильный логин</span>}
            </label>
            <div className="flex gap-6">
              <label className="flex flex-col w-auto" htmlFor="email">
                <input
                  className="w-full p-7 text-2xl placeholder:text-white rounded-xl bg-[#15171C] outline-none"
                  id="email"
                  type="text"
                  placeholder="Логин"
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                />
                { error.email && <span className="mt-2 text-xl text-red-500">Неправильный логин</span>}
              </label>
              <button className="w-1/2 p-7 text-2xl rounded-xl border border-[#454b5a] outline-none hover:bg-[#454b5a]">Отправить код</button>
            </div>
            <label className="flex flex-col w-full" htmlFor="password">
              <input
                className="w-full p-7 text-2xl placeholder:text-white rounded-xl bg-[#15171C] outline-none"
                id="password"
                type="password"
                placeholder="Пароль"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
              { error.password && <span className="mt-2 text-xl text-red-500">Неправильный пароль</span>}
            </label>
            <label className="flex flex-col w-full" htmlFor="password2">
              <input
                className="w-full p-7 text-2xl placeholder:text-white rounded-xl bg-[#15171C] outline-none"
                id="password2"
                type="password"
                placeholder="Повторите пароль"
                value={password2}
                onInput={(e) => setPassword(e.target.value)}
              />
              { error.password && <span className="mt-2 text-xl text-red-500">Неправильный пароль</span>}
            </label>
            <label className="flex flex-col w-full" htmlFor="refCode">
              <input
                className="w-full p-7 text-2xl placeholder:text-white rounded-xl bg-[#15171C] outline-none"
                id="refCode"
                type="text"
                placeholder="Реферальный код"
                value={refCode}
                onInput={(e) => setPassword(e.target.value)}
              />
              { error.password && <span className="mt-2 text-xl text-red-500">Неправильный пароль</span>}
            </label>
            <button className="button-outline px-16 py-6 mx-auto text-2xl rounded-xl">Зарегистрироваться</button>
            <div className="mt-12 mb-4 text-xl text-center">
              Есть учетная запись? <Link to="/login" className="text-primary font-bold hover:text-primary-hover">Авторизация</Link>
            </div>
          </form>
        </div>
      </div>
    </LayoutEmpty>
  )
}

export default LoginPage;