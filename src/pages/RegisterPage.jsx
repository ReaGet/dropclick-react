import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LayoutEmpty } from "layouts/empty";
import { useAuth } from "hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationCodeSend, setVerificationCodeSend] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
    password2: false,
    verificationCode: false,
  });

  const [randomCode, setRandomCode] = useState((Math.floor(Math.random() * (999 - 100 + 1)) + 100).toString());

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      return;
    }

    const { success, data } = await signup(email, password);

    if (!success) {
      const errors = {};
      if (data.code === "auth/email-already-in-use") {
        errors["email"] = "Email уже занят";
      }
      setError(errors);
    } else {
      setError({
        email: false,
        password: false,
        password2: false,
        verificationCode: false,
      });

      fetch("https://dropclick.pro/base/addUser.php", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          count: refCode
        }),
      }).then(() => {
        navigate("/");
      });
    }
  };

  const validate = () => {
    const errors = {};
    if (!email.length) {
      errors["email"] = "Заполните поле";
    }
    if (!password.length) {
      errors["password"] = "Заполните поле";
    }
    if (password !== password2) {
      errors["password2"] = "Пароли не совпадают";
    }
    if (!verificationCode) {
      errors["verificationCode"] = "Введите код";
      if (verificationCode != randomCode) {
        errors["verificationCode"] = "Неверный код";
      }
    }
    setError(errors);
    return Object.keys(errors).length;
  }

  const sendVerificationCode = (event) => {
    event.preventDefault();
    if (randomCode > 0 ) {        
      fetch("https://dropclick.pro/base/postMail.php", {
        method: "POST",
        body: JSON.stringify({
          email,
          code: randomCode,
        }),
      }).then(() => {
        setVerificationCodeSend(true);
      });
    }
  };

  return (
    <LayoutEmpty>
      <div className="container flex items-center justify-center min-h-screen text-white">
        <div className="flex flex-col gap-28 w-full max-w-[600px] min-h-[400px] px-4 sm:px-20 py-8 sm:bg-[#0B0B0B] rounded-3xl">
          <div className="flex flex-col items-center">
            <div className="mt-28 text-5xl">Регистрация</div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-12">
            <label className="flex flex-col w-full" htmlFor="email">
              <input
                className="w-full p-7 text-2xl placeholder:text-[#4d5361] rounded-xl bg-[#15171C] outline-none"
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              />
              { error.email && <span className="mt-2 text-xl text-red-500">{error.email}</span>}
            </label>
            <div className="flex items-start gap-6">
              <label className="flex flex-col w-auto" htmlFor="verificationCode">
                <input
                  className="w-full p-7 text-2xl placeholder:text-[#4d5361] rounded-xl bg-[#15171C] outline-none"
                  id="verificationCode"
                  type="text"
                  placeholder="Код"
                  value={verificationCode}
                  onInput={(e) => setVerificationCode(e.target.value)}
                />
                { error.verificationCode && <span className="mt-2 text-xl text-red-500">{error.verificationCode}</span>}
              </label>
              <button
                className={[
                  "w-1/2 p-7 text-2xl rounded-xl border outline-none",
                  isVerificationCodeSend ? "border-primary" : "border-[#454b5a] hover:bg-[#454b5a]"
                ].join(" ")}
                onClick={(event) => sendVerificationCode(event)}
              >{isVerificationCodeSend ? "Код отправлен" : "Отправить код"}</button>
            </div>
            <label className="flex flex-col w-full" htmlFor="password">
              <input
                className="w-full p-7 text-2xl placeholder:text-[#4d5361] rounded-xl bg-[#15171C] outline-none"
                id="password"
                type="password"
                placeholder="Пароль"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
              { error.password && <span className="mt-2 text-xl text-red-500">{error.password}</span>}
            </label>
            <label className="flex flex-col w-full" htmlFor="password2">
              <input
                className="w-full p-7 text-2xl placeholder:text-[#4d5361] rounded-xl bg-[#15171C] outline-none"
                id="password2"
                type="password"
                placeholder="Повторите пароль"
                value={password2}
                onInput={(e) => setPassword2(e.target.value)}
              />
              { error.password2 && <span className="mt-2 text-xl text-red-500">{error.password2}</span> }
            </label>
            <label className="flex flex-col w-full" htmlFor="refCode">
              <input
                className="w-full p-7 text-2xl placeholder:text-[#4d5361] rounded-xl bg-[#15171C] outline-none"
                id="refCode"
                type="text"
                placeholder="Реферальный код"
                value={refCode}
                onInput={(e) => setRefCode(e.target.value)}
              />
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