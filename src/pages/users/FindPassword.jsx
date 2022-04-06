import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apis from 'apis/apis';
import lo from 'lodash';

import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Header, Text, Input, Button } from 'components';

function FindPassword(props) {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [emailCheckMessage, setEmailCheckMessage] = useState();
  const [isValidEmailByRegex, setIsValidEmailByRegex] = useState(false);
  const [isRegisteredEmail, setIsRegisteredEmail] = useState(false);

  const emailDebounce = lo.debounce((k) => setEmail(k), 500);
  const emailKeyPress = useCallback(emailDebounce, []);

  const changeEmail = (e) => {
    emailKeyPress(e.target.value);
  };

  useEffect(() => {
    checkEmailByRegex(email);
  }, [email]);

  const checkEmailByRegex = (email) => {
    const regEmail = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+){2,3}$/;

    if (email && !regEmail.test(email)) {
      setEmailCheckMessage('이메일을 다시 확인해주세요');
      setIsValidEmailByRegex(false);
    } else if (email && regEmail.test(email)) {
      setEmailCheckMessage('올바른 이메일 형식입니다');
      setIsValidEmailByRegex(true);
    } else {
      setEmailCheckMessage();
      setIsValidEmailByRegex(false);
    }
  };

  const checkRegisteredEmail = async (email) => {
    if (isValidEmailByRegex) {
      const response = await apis.verifyEmail(email);
      if (response.data.message === 'true') {
        setEmailCheckMessage('이미 사용 중인 이메일입니다');
        setIsRegisteredEmail(true);
      } else if (response.data.message === 'false') {
        setEmailCheckMessage('사용하실 수 있는 이메일입니다');
      } else {
        setEmailCheckMessage();
      }
    } else {
      return;
    }
  };

  const handleButtonClick = (e) => {
    async function sendPasswordEmail(email) {
      await apis.findMyPassword(email).then(() => {
        navigate('/login');
      });
    }
    sendPasswordEmail(email);
  };

  return (
    <Wrapper
      backgroundColor={themeContext.colors.white}
      padding="0px 24px 0px 24px"
    >
      <Header label="비밀번호 찾기" leftArrow />
      <Grid padding="18px 0px 189px 0px">
        <Grid padding="0px 0px 18px 0px">
          <Text color={themeContext.colors.darkGray}>
            회원정보를 입력하시면 이메일로 임시 비밀번호를 발급해드려요.
          </Text>
        </Grid>
        <Input
          fluid
          placeholder="이메일(아이디)"
          onChange={changeEmail}
          type="text"
        />
        <Grid width="100%" isFlex padding="8px 17.5px 0px 17.5px">
          <Text
            small
            color={
              isValidEmailByRegex
                ? themeContext.colors.blue
                : themeContext.colors.red
            }
          >
            {emailCheckMessage}
          </Text>
          <Grid
            onClick={() => {
              checkRegisteredEmail(email);
            }}
          >
            <Text small color={themeContext.colors.blue}>
              이메일 확인
            </Text>
          </Grid>
        </Grid>
      </Grid>
      <Grid center>
        <Button
          onClick={handleButtonClick}
          secondary
          disabled={!(isValidEmailByRegex && isRegisteredEmail)}
        >
          비밀번호 찾기
        </Button>
      </Grid>
    </Wrapper>
  );
}

export default FindPassword;
