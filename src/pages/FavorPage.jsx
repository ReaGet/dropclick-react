import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import { useLocation } from 'react-router-dom';
import { Navbar } from 'components/Navbar';

const FavorPage = () => {

  let { state } = useLocation();

  const {isAuth, email} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
    if (!state) {
      navigate('/');
    }
  });

  return (
    <div>
      <Navbar email={email} />
    </div>
  )
}

export default FavorPage