import React, { useEffect, useState } from 'react';
import { useAuth } from "hooks/useAuth";
import { Layout } from 'layouts/default';
import { PersonalInfo } from 'components/account/PersonalInfo';
import { Subscribition } from 'components/account/Subscribition';
import { Security } from 'components/account/Security';

const AccountPage = () => {
  const [currentTab, setCurrentTab] = useState("personal-info");
  const { user } = useAuth();


  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate('/login');
  //   }
  // });

  const [date, setDate] = useState();

  // useEffect(() => {
  //   axios
  //     .post("https://dropclick.pro/base/getSubs.php", {
  //       email: email
  //     })
  //     .then(res => {
  //       setDate(res.data);
  //     })
  // }, [isAuth])

const TABS = {
  PERSONAL: "personal-info",
  SUBS: "subscribition",
  SECURITY: "security",
}

const tabStyles = "px-8 py-7 hover:bg-[#111111] text-left rounded-xl cursor-pointer";
const tabs = [
  {
    title: "Личная информация",
    slug: TABS.PERSONAL,
    component: <PersonalInfo />,
  },
  {
    title: "Подписка",
    slug: TABS.SUBS,
    component: <Subscribition />,
  },
  {
    title: "Безопасность",
    slug: TABS.SECURITY,
    component: <Security />,
  },
];

  return (
    <Layout>
      <div className="container flex flex-col md:flex-row gap-8 text-white">
        <aside className="scrollbar flex flex-col items-center gap-20 w-full md:w-[300px] md:px-6 pb-4 pt-8 md:pb-8 rounded-2xl md:bg-[#0B0B0B] md:border border-[#202020]">
          <div className="hidden md:flex flex-col items-center gap-6">
            <div className="flex items-center justify-center w-40 h-40 rounded-full border">
              <svg className="fill-white" width="50" height="50">
                <use xlinkHref="/assets/icons/sprites.svg#profile"></use>
              </svg>
            </div>
            <span className="text-xl">rifat2125@gmail.com</span>
          </div>
          <ul className="flex md:flex-col gap-4 w-full text-2xl whitespace-nowrap">
            { tabs.map((tab) => {
                return <li
                  key={tab.slug}
                  onClick={() => setCurrentTab(tab.slug)}
                  className={[
                    tabStyles,
                    tab.slug === currentTab ? "bg-[#111111]" : "",
                  ].join(" ")}
                >
                  { tab.title }
                </li>
            })}
          </ul>
        </aside>
        <main className="flex-1 p-16 rounded-2xl bg-[#0B0B0B] border border-[#202020]">
          { tabs.find((tab) => tab.slug === currentTab).component }
        </main>
      </div>
    </Layout>
  )
}

export default AccountPage;