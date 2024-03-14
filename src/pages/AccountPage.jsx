import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "hooks/useAuth";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Layout } from 'layouts/default';
import { PersonalInfo } from 'components/account/PersonalInfo';
import { Subscribition } from 'components/account/Subscribition';

const AccountPage = () => {
  const [currentTab, setCurrentTab] = useState("personal-info");

    const {isAuth, email} = useAuth();
  
    const navigate = useNavigate();

    const { t } = useTranslation();
  
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

  const tabStyles = "px-8 py-7 bg-[#111111] text-xl text-left rounded-3xl cursor-pointer"

  return (
    <Layout>
      <div className="container flex text-white">
        <aside className="w-[250px] bg-[#0B0B0B]">
          <ul className="flex flex-col gap-4 w-full px-8 py-12">
            <li onClick={() => setCurrentTab('personal-info')} className={tabStyles}>Личная информация</li>
            <li onClick={() => setCurrentTab('subscribition')} className={tabStyles}>Подписка</li>
          </ul>
        </aside>
        <main>
          { currentTab === "personal-info" && <PersonalInfo /> }
          { currentTab === "subscribition" && <Subscribition /> }
        </main>
      </div>
    </Layout>
  )
}

export default AccountPage;