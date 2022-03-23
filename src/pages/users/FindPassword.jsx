import React, { useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Header, Text, Input, Button } from 'components';

function FindPassword(props) {
  const themeContext = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleButtonClick = (e) => {};

  return (
    <Wrapper
      backgroundColor={themeContext.colors.white}
      padding="70px 24px 0px 24px"
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
          placeholder="이름"
          value={email}
          onChange={changeEmail}
          type="text"
        />
        <Input
          fluid
          placeholder="이메일(아이디)"
          value={password}
          onChange={changePassword}
          type="password"
        />
      </Grid>
      <Grid center>
        <Button onClick={handleButtonClick} secondary>
          비밀번호 찾기
        </Button>
      </Grid>
    </Wrapper>
  );
}

export default FindPassword;
