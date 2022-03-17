import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper, Image, Logo } from 'components';
import { LoadingSpinner } from 'components/molecules';

const Splash = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 3000);
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
