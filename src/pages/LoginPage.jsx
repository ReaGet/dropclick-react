import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutEmpty } from "layouts/empty";
import { useAuth } from "hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { success, data } = await login(email, password);
    console.log(success, data)

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
            <div className="mt-28 text-5xl">ВХОД</div>
            {/* <span className="text-2xl">Пожалуйста, введите свой логин и пароль!</span> */}
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
            <button className="button-outline px-16 py-6 mx-auto text-2xl rounded-xl">Войти</button>
            <div className="mt-12 mb-4 text-xl text-center">
              У вас нет учетной записи? <Link to="/register" className="text-primary font-bold hover:text-primary-hover">Регистрация</Link>
            </div>
          </form>
        </div>
      </div>
    </LayoutEmpty>
  )
}

export default LoginPage;