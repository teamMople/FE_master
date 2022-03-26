import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAsync } from '../../modules/users';
import axios from 'axios';
import { setCookie } from '../../shared/utils/Cookie';

import styled, { css, keyframes } from 'styled-components';
import { ThemeContext } from 'styled-components';
import {
  Wrapper,
  Text,
  Input,
  Button,
  Grid,
  Header,
  OAuthLoginButtons,
} from 'components';
import { useDispatch } from 'react-redux';
import SectionWrapper from '../../components/molecules/SectionWrapper';

function Login(props) {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = (e) => {
    if (email === '' || password === '') {
      window.alert('이메일, 비밀번호 모두 입력해주세요.');
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/login`,
          JSON.stringify({ email, password }),
          { headers: { 'Content-Type': 'application/json' } },
        )
        .then((response) => {
          if (response.status === 200) {
            setCookie('token', response.headers.authorization, 1);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('nickname', response.data.nickname);
            navigate('/home');
          }
        })
        .catch((e) => {
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 5000);
        });
    }
  };

  const userInfo = { email, password };

  React.useEffect(() => {}, []);

  return (
    <>
      <Wrapper backgroundColor={themeContext.colors.white}>
        <Header label="" leftArrow={true} rightArrow={false} fixedTop />
        <SectionWrapper>
          <Grid margin="0px 0px 8px 0px">
            <Input
              marign-bottom="8px"
              type="text"
              placeholder="이름"
              value={email}
              onChange={changeEmail}
            />
          </Grid>
          <Grid>
            <Input
              marign-bottom="5px"
              type="password"
              placeholder="이메일(아이디)"
              value={password}
              onChange={changePassword}
            />
          </Grid>

          {showMessage && (
            <MessageBox>
              <Grid center>
                <Text
                  size="12px"
                  lineHeight="18px"
                  color={themeContext.colors.blue}
                >
                  이메일 또는 비밀번호를 다시 확인해주세요
                </Text>
              </Grid>
            </MessageBox>
          )}

          <Grid center padding="13px 0px 13px 0px" margin="0px 0px 36px 0px">
            <Grid isFlex width="50%">
              <Link to="/findpassword">
                <Text size="14px" color={themeContext.colors.blue}>
                  비밀번호 찾기
                </Text>
              </Link>
              <Link to="/signup">
                <Text size="14px" color={themeContext.colors.blue}>
                  회원가입
                </Text>
              </Link>
            </Grid>
          </Grid>
          <Grid padding="0px 15px 0px 15px">
            <Button
              onClick={handleLoginClick}
              fluid
              secondary
              margin="0px 0px 8px 0px"
            >
              로그인
            </Button>
            <OAuthLoginButtons />
          </Grid>
        </SectionWrapper>
      </Wrapper>
    </>
  );
}

const MessageBox = styled.div`
  transition: 1s ease-in;
`;

export default Login;
