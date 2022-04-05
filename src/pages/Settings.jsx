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
import { setDarkTheme } from '../modules/serviceTheme';

function Settings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [active, setActive] = useState(false);

  const changeTheme = () => {
    if (active) {
      setActive(false);
      localStorage.setItem('theme', 'light');
      dispatch(setDarkTheme(false));
    } else {
      setActive(true);
      localStorage.setItem('theme', 'dark');
      dispatch(setDarkTheme(true));
    }
  };

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setActive(true);
      dispatch(setDarkTheme(true));
    } else {
      setActive(false);
      dispatch(setDarkTheme(false));
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
      <NewWrapper padding="0 24px">
        <Header label="설정" leftArrow />
        <Grid margin="12px 0px 40px 0px">
          <MenuItem onClick={() => navigate('/editmyprofile')}>
            <Text>프로필 편집</Text>
            <RightArrow active />
          </MenuItem>
          <MenuItem onClick={() => navigate('/changepassword')}>
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
          <MenuItem
            onClick={() => {
              navigate('/inactivate');
            }}
          >
            <Text>비활성화하기</Text>
            <RightArrow active />
          </MenuItem>
        </Grid>
        <Grid>
          <MenuItem>
            <Text>다크 모드</Text>
            <ToggleButton active={active} onClick={changeTheme} />
          </MenuItem>
          <MenuItem>
            <Text>버전</Text>
            <Text small>version {process.env.REACT_APP_VERSION}</Text>
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

  -webkit-tap-highlight-color: ${({ theme }) => theme.colors.lightGray};
  &:active {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
  &.disabled {
    opacity: 0.2;
    pointer-events: none;
  }
`;

export default Settings;
