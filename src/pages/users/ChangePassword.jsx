import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Header, Text, Input, Button } from 'components';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const checkPassword = (password, confirmPassword) => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[.!@#$%])/;

    if (!password) {
      return;
    } else {
      if (!regPassword.test(password)) {
        return '잘못된 비밀번호 양식입니다.영문 대소문자, 숫자, 특수문자(.!@#$%)를 넣어주세요';
      } else if (password.length < 8 || password.length > 20) {
        return '비밀번호는 8-20자로 입력해주세요';
      } else if (!confirmPassword) {
        return '올바른 비밀번호입니다.확인 비밀번호를 입력해주세요';
      } else if (password !== confirmPassword) {
        return '비밀번호와 확인 비밀번호가 일치하지 않아요';
      } else {
        return '비밀번호와 확인 비밀번호가 일치합니다';
      }
    }
  };

  return (
    <Wrapper
      full
      backgroundColor={themeContext.colors.white}
      padding="0px 24px 0px 24px"
    >
      <Header
        label="비밀번호 변경"
        leftArrow
        leftArrowOnClick={() => {
          navigate(-1);
        }}
      />
      <Grid margin="43px 0px 33px 0px">
        <Text>변경하실 비밀번호를 입력해주세요 :)</Text>
      </Grid>
      <Grid>
        <Input
          fluid
          placeholder="비밀번호"
          type="password"
          onChange={changePassword}
          autoFocus
        />
        <Input
          fluid
          placeholder="비밀번호 확인"
          type="password"
          onChange={changeConfirmPassword}
        />
        <Grid padding="8px 16px 0px 8px">
          <Text
            size="10px"
            color={
              checkPassword(password, confirmPassword) ===
              '비밀번호와 확인 비밀번호가 일치합니다'
                ? themeContext.colors.alertGreen
                : themeContext.colors.red
            }
          >
            {checkPassword(password, confirmPassword)}
          </Text>
        </Grid>
      </Grid>
      <Grid
        style={{
          position: 'absolute',
          bottom: '101px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Button secondary>변경하기</Button>
      </Grid>
    </Wrapper>
  );
};

export default ChangePassword;
