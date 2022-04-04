import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Button, Text } from 'components';

const NotFound = (props) => {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Wrapper full backgroundColor={themeContext.colors.white}>
      <Grid height="100%" center>
        <img src="/asset/image/page/notFound.svg" />
        <Grid width="100%" center>
          <Text size="14px" color={themeContext.colors.blue}>
            잘못된 페이지 요청입니다
          </Text>
        </Grid>
      </Grid>
      <div
        style={{
          position: 'fixed',
          left: '0px',
          bottom: '101px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button secondary onClick={() => navigate('/')}>
          홈으로 돌아가기
        </Button>
      </div>
    </Wrapper>
  );
};

export default NotFound;
