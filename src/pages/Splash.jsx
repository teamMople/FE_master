import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../shared/utils/Cookie';
import { Wrapper, FullModal, BasicModal, Logo, Text, Grid } from 'components';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'shared/utils/firebase';
import { getMessaging, getToken } from 'firebase/messaging';
import apis from 'apis/apis';

const Splash = () => {
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseMessaging = getMessaging(firebaseApp);

  const [isOpened, setIsOpened] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsOpened(false);
  };

  getToken(firebaseMessaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        setIsVisible(true);
        setIsOpened(false);
      } else {
        setIsOpened(true);
      }
    })
    .catch((err) => console.log(err));

  useEffect(() => {
    const token = getCookie('token');

    if (!isOpened) {
      setTimeout(() => {
        if (token) {
          navigate('/home');
        } else {
          navigate('/login');
        }
      }, 1200);
    }
  }, [isOpened]);

  return (
    <React.Fragment>
      <BasicModal
        open={isOpened}
        close={isOpened}
        onClose={handleClose}
        onConfirm={handleClose}
        isVisible={isVisible}
      >
        <Grid padding="0px 24px 12px 24px">
          <Grid center margin="0px 0px 20px 0px">
            <Text small>원활한 앱 사용을 위해 아래 권한이 필요합니다.</Text>
          </Grid>
          <Grid>
            <Grid isSide margin="0px 0px 16px 0px">
              <Grid center width="32px" margin="0px 8px 0px 0px">
                <img
                  src="/asset/icons/Check.svg"
                  alt="icon"
                  width="20px"
                  height="20px"
                />
              </Grid>
              <Grid width={'100%'}>
                <Grid margin="0px 0px 10px 0px">
                  <Text bold small color={themeContext.colors.darkGray}>
                    사진 (선택)
                  </Text>
                  <Text small color={themeContext.colors.darkGray}>
                    프로필 및 게시물 사진 등록에 필요합니다.
                  </Text>
                </Grid>
                <Grid
                  width={'100%'}
                  height={'1px'}
                  backgroundColor={themeContext.colors.lightGray}
                />
              </Grid>
            </Grid>
            <Grid isSide margin="0px 0px 16px 0px">
              <Grid center width="32px" margin="0px 8px 0px 0px">
                <img
                  src="/asset/icons/Check.svg"
                  alt="icon"
                  width="20px"
                  height="20px"
                />
              </Grid>
              <Grid width={'100%'}>
                <Grid margin="0px 0px 10px 0px">
                  <Text bold small color={themeContext.colors.darkGray}>
                    알림 (필수)
                  </Text>
                  <Text small color={themeContext.colors.darkGray}>
                    댓글 알림 수신에 필요합니다.
                  </Text>
                </Grid>
                <Grid
                  width={'100%'}
                  height={'1px'}
                  backgroundColor={themeContext.colors.lightGray}
                />
              </Grid>
            </Grid>
            <Grid isSide margin="0px 0px 16px 0px">
              <Grid center width="32px" margin="0px 8px 0px 0px">
                <img
                  src="/asset/icons/Check.svg"
                  alt="icon"
                  width="20px"
                  height="20px"
                />
              </Grid>
              <Grid width={'100%'}>
                <Grid margin="0px 0px 10px 0px">
                  <Text bold small color={themeContext.colors.darkGray}>
                    마이크 (필수)
                  </Text>
                  <Text small color={themeContext.colors.darkGray}>
                    라이브 음성 채팅에 필요합니다.
                  </Text>
                </Grid>
                <Grid
                  width={'100%'}
                  height={'1px'}
                  backgroundColor={themeContext.colors.lightGray}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </BasicModal>
      <Wrapper full backgroundColor={themeContext.colors.white}>
        <Grid center height="100%">
          <Logo />
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
};

export default Splash;
