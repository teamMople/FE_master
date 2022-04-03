import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'modules/users';

import styled from 'styled-components';
import {
  Wrapper,
  Grid,
  Text,
  RightArrow,
  Header,
  BasicModal,
  ToggleButton,
} from 'components';

function Settings(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [dark, setDark] = useState(false);

  const changeTheme = () => {
    if (dark) {
      setDark(false);
      localStorage.setItem('theme', 'light');
    } else {
      setDark(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);

  return (
    <>
      <BasicModal
        open={openModal}
        confirmMessage={'네!'}
        closeMessage={'아니요!'}
        onConfirm={() => dispatch(logout())}
        onClose={() => setOpenModal(false)}
      >
        정말 로그아웃을 하시겠습니까?
      </BasicModal>
      <NewWrapper padding="0 12px">
        <Header label="설정" leftArrow />
        <Grid margin="12px 0px 40px 0px">
          <MenuItem onClick={() => navigate('/editmyprofile')}>
            <Text>프로필 편집</Text>
            <RightArrow active />
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <Text>비밀번호 변경</Text>
            <RightArrow active />
          </MenuItem>
        </Grid>

        <Grid margin="0px 0px 40px 0px">
          <MenuItem onClick={() => {}} className="disabled">
            <Text>Our Team</Text>
            <RightArrow active />
          </MenuItem>
          <MenuItem onClick={() => {}} className="disabled">
            <Text>FAQ/문의사항</Text>
            <RightArrow active />
          </MenuItem>
          <MenuItem onClick={() => {}} className="disabled">
            <Text>이용약관</Text>
            <RightArrow active />
          </MenuItem>
          <MenuItem onClick={() => {}} className="disabled">
            <Text>개인정보 처리방침</Text>
            <RightArrow active />
          </MenuItem>
        </Grid>
        <Grid margin="0px 0px 40px 0px">
          <MenuItem
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <Text>로그아웃</Text>
            <RightArrow active />
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <Text>비활성화하기</Text>
            <RightArrow active />
          </MenuItem>
        </Grid>
        <Grid>
          <MenuItem>
            <Text>다크 모드</Text>
            <ToggleButton active={dark} onClick={changeTheme} />
          </MenuItem>
          <MenuItem>
            <Text>버전</Text>
            <Text small>v {process.env.REACT_APP_VERSION}</Text>
          </MenuItem>
        </Grid>
      </NewWrapper>
    </>
  );
}

const NewWrapper = styled(Wrapper)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

const MenuItem = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 12px;
  border-radius: 10px;
  transition: all 0.2s ease;

  &:active {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
  &.disabled {
    opacity: 0.2;
    pointer-events: none;
  }
`;

export default Settings;
