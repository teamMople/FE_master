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
          <Text color={themeContext.colors.blue}>에러가 발생했습니다!</Text>
        </Grid>
        <Button
          secondary
          onClick={() => {
            navigate('/home');
          }}
        >
          홈으로 돌아가기
        </Button>
      </Grid>
    </Wrapper>
  );
};

export default Error;
