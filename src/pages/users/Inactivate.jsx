import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Header, Survey, Button } from 'components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { inactivateUserAsync } from 'modules/users';

function Inactivate(props) {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Survey
  const labels = [
    '계정을 비활성화하면 공개 프로필이 표시되지 않습니다.',
    '비활성화는 30일 동안 유지됩니다. 30일 비활성화 기간 내에 계정에 로그인을 하면 계정은 복구됩니다.',
    '30일 비활성화 기간 내에 계정에 접속하지 않으면 계정이 삭제되고 아이디는 더 이상 계정과 연결되지 않습니다.비활성화 이후 팔로워 또는 닉네임은 복구되지 않습니다.',
  ];

  const [checkList, setCheckList] = useState([false, false, false]);
  const handleCheckClick = (index) => {
    setCheckList((checks) => checks.map((c, i) => (i === index ? !c : c)));
  };
  const isAllChecked = checkList.every((x) => x);

  // Submit
  const email = localStorage.getItem('email');

  return (
    <Wrapper
      full
      backgroundColor={themeContext.colors.white}
      padding="0px 24px 0px 24px"
    >
      <Header
        label="비활성화하기"
        leftArrow
        leftArrowOnClick={() => {
          navigate(-1);
        }}
      />
      <Grid margin="24px 0px 0px 0px">
        {labels.map((label, idx) => (
          <Survey
            key={idx}
            label={label}
            onClick={() => handleCheckClick(idx)}
            checked={checkList[idx]}
          />
        ))}
      </Grid>
      <Grid
        style={{
          position: 'absolute',
          bottom: '101px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Button
          onClick={() => {
            dispatch(inactivateUserAsync(email));
          }}
          secondary
          disabled={!isAllChecked}
        >
          확인
        </Button>
      </Grid>
    </Wrapper>
  );
}

const SubmitButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.5;
`;

export default Inactivate;
