import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../shared/utils/Cookie';
import { Wrapper, FullModal, Logo, Text, Grid } from 'components';
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
        console.log(currentToken);
        apis.pushAlarm(currentToken).then((response) => {
          console.log(response);
        });
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
      <FullModal
        open={isOpened}
        close={isOpened}
        onClose={handleClose}
        onConfirm={handleClose}
        isVisible={isVisible}
      >
        <Grid margin="0px 0px 16px 0px">
          <Text bold large>
            원활한 앱 사용을 위해 아래 권한이 필요합니다.
          </Text>
        </Grid>
        <Grid>
          <Grid isSide margin="0px 0px 16px 0px">
            <Grid center width="32px" margin="0px 8px 0px 0px">
              <img src="/asset/icons/Image.svg" />
            </Grid>
            <Grid>
              <Text bold medium>
                사진(선택)
              </Text>
              <Text medium>프로필 및 게시물 사진 등록에 필요합니다.</Text>
            </Grid>
          </Grid>
          <Grid isSide margin="0px 0px 16px 0px">
            <Grid center width="32px" margin="0px 8px 0px 0px">
              <img src="/asset/icons/Bell.svg" />
            </Grid>
            <Grid>
              <Text bold medium>
                알림(필수)
              </Text>
              <Text medium>댓글 알림 수신에 필요합니다.</Text>
            </Grid>
          </Grid>
          <Grid isSide margin="0px 0px 16px 0px">
            <Grid center width="32px" margin="0px 8px 0px 0px">
              <img src="/asset/icons/microphone.svg" />
            </Grid>
            <Grid>
              <Text bold medium>
                마이크(필수)
              </Text>
              <Text medium>라이브 음성 채팅에 필요합니다.</Text>
            </Grid>
          </Grid>
        </Grid>
      </FullModal>
      <Wrapper full backgroundColor={themeContext.colors.white}>
        <div style={{ margin: 'auto' }}>
          <Logo />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default Splash;
