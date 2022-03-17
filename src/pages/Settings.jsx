import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper, Grid, Text, RightArrow } from '../components/atoms';
import { Header } from '../components/molecules';

function Settings(props) {
  const navigate = useNavigate();

  return (
    <Wrapper padding="45px 24px 0px 24px">
      <Header label="설정" />
      <Grid isFlex>
        <Text>프로필 편집</Text>
        <RightArrow
          onClick={() => {
            navigate('/');
          }}
        />
      </Grid>
      <Grid isFlex>
        <Text>비밀번호 변경</Text>
        <RightArrow
          onClick={() => {
            navigate('/');
          }}
        />
      </Grid>
      <Grid isFlex>
        <Text>Our Team</Text>
        <RightArrow
          onClick={() => {
            navigate('/');
          }}
        />
      </Grid>
      <Grid isFlex>
        <Text>FAQ/문의사항</Text>
        <RightArrow
          onClick={() => {
            navigate('/');
          }}
        />
      </Grid>
      <Grid isFlex>
        <Text>이용약관</Text>
        <RightArrow
          onClick={() => {
            navigate('/');
          }}
        />
      </Grid>
      <Grid isFlex>
        <Text>개인정보 처리방침</Text>
        <RightArrow
          onClick={() => {
            navigate('/');
          }}
        />
      </Grid>
      <Grid isFlex>
        <Text>로그아웃</Text>
        <RightArrow
          onClick={() => {
            navigate('/');
          }}
        />
      </Grid>
      <Grid isFlex>
        <Text>비활성화하기</Text>
        <RightArrow
          onClick={() => {
            navigate('/');
          }}
        />
      </Grid>
    </Wrapper>
  );
}

export default Settings;
