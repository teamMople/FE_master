import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Text, Loader } from 'components';
import { useNavigate } from 'react-router-dom';

function Welcome(props) {
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);
  const nickname = localStorage.getItem('nickname');
  // const nickname = useSelector(selectUserState);

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 5000);
  }, []);

  return (
    <Wrapper
      backgroundColor={themeContext.colors.white}
      padding="70px 24px 0px 24px"
    >
      <div
        style={{
          padding: '160px 0px 0px 0px',
          margin: 'auto',
        }}
      >
        <Grid center>
          <img src="/asset/image/page/welcome.svg" />
        </Grid>
        <Grid>
          <Text color={themeContext.colors.blue}>
            <div style={{ textAlign: 'center' }}>환영합니다!</div>
          </Text>
          <Text color={themeContext.colors.blue}>
            <div style={{ textAlign: 'center' }}>
              흥미진진한 토론이 {nickname}님을 기다리고 있어요 :)
            </div>
          </Text>
        </Grid>
        <Grid center>
          <Loader type="dot" backgroundColor={themeContext.colors.blue} />
        </Grid>
      </div>
    </Wrapper>
  );
}

Welcome.propTypes = {
  nickname: PropTypes.string,
};

export default Welcome;
