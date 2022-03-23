import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAsync } from 'modules/users';

import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Text, RightArrow, Header } from 'components';

function Settings(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  return (
    <Wrapper
      backgroundColors={themeContext.colors.white}
      padding="42px 24px 0px 24px"
    >
      <Header label="설정" leftArrow />
      <Grid margin="12px 0px 40px 0px">
        <Grid isFlex height="40px">
          <Text>프로필 편집</Text>
          <RightArrow
            active
            rightArrowOnClick={() => navigate('/editmyprofile')}
          />
        </Grid>
        <Grid isFlex height="40px">
          <Text>비밀번호 변경</Text>
          <RightArrow active rightArrowOnClick={() => {}} />
        </Grid>
      </Grid>

      <Grid margin="0px 0px 40px 0px">
        <Grid isFlex height="40px">
          <Text>Our Team</Text>
          <RightArrow active rightArrowOnClick={() => {}} />
        </Grid>
        <Grid isFlex height="40px">
          <Text>FAQ/문의사항</Text>
          <RightArrow active rightArrowOnClick={() => {}} />
        </Grid>
        <Grid isFlex height="40px">
          <Text>이용약관</Text>
          <RightArrow active rightArrowOnClick={() => {}} />
        </Grid>
        <Grid isFlex height="40px">
          <Text>개인정보 처리방침</Text>
          <RightArrow active rightArrowOnClick={() => {}} />
        </Grid>
      </Grid>

      <Grid>
        <Grid isFlex height="40px">
          <Text>로그아웃</Text>
          <RightArrow
            active
            rightArrowOnClick={() => {
              dispatch(logoutAsync());
            }}
          />
        </Grid>
        <Grid isFlex height="40px">
          <Text>비활성화하기</Text>
          <RightArrow active rightArrowOnClick={() => {}} />
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Settings;
