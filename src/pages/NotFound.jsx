import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { Grid, Button, Text } from 'components';

const NotFound = (props) => {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <div style={{ margin: 'auto' }}>
        <img src="/asset/image/page/notFound.svg" />
        <Grid width="100%" center>
          <Text size="14px" color={themeContext.colors.blue}>
            잘못된 페이지 요청입니다
          </Text>
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
          <Button
            onClick={() => navigate('/')}
            width="148px"
            height={38}
            color={themeContext.colors.white}
            backgroundColor={themeContext.colors.blue}
            margin="0px 0px 0px 0px"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
