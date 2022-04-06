import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Button, Text } from 'components';
import { useNavigate } from 'react-router-dom';

const InvalidLogin = (props) => {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Wrapper full backgroundColor={themeContext.colors.white}>
      <Grid height="100%" center>
        <Grid margin="0px 0px 16px 0px">
          <img src="/asset/image/page/notFound.svg" />
        </Grid>
        <Grid margin="0px 0px 16px 0px" center>
          <Text large color={themeContext.colors.blue}>
            로그인에 실패하였습니다
          </Text>
        </Grid>
        <Grid margin="0px 0px 32px 0px" center>
          <Text large color={themeContext.colors.blue}>
            다른 로그인 방법은 어떠신가요?
          </Text>
        </Grid>
        <Button
          secondary
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인으로 돌아가기
        </Button>
      </Grid>
    </Wrapper>
  );
};

export default InvalidLogin;
