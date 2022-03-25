import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../shared/utils/Cookie';
import { Logo } from 'components';

const Splash = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');

    setTimeout(() => {
      if (token) {
        window.location.assign('/home');
      } else {
        navigate('/login');
      }
    }, 5000);
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <div style={{ margin: 'auto' }}>
        <Logo />
      </div>
    </div>
  );
};

export default Splash;
