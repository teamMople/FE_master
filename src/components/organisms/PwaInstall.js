import React from 'react';
import styled from 'styled-components';
import { useReactPWAInstall } from 'react-pwa-install';
import PropTypes from 'prop-types';

// import { Icon } from '../elements';

import { logo } from 'shared/assets';

const PwaInstall = (props) => {
  const { pwaInstall } = useReactPWAInstall();

  const handleClick = () => {
    pwaInstall({
      title: ' ',
      logo: logo,
    })
      .then(() => {
        // 설치 성공
      })
      .catch(() => {
        console.log('설치 실패');
      });
  };

  return (
    <WebInstallButton onClick={handleClick}>{props.children}</WebInstallButton>
  );
};

PwaInstall.propTypes = {
  notMobile: PropTypes.bool,
  children: PropTypes.any,
};

const WebInstallButton = styled.div`
  cursor: pointer;
`;

export default PwaInstall;
