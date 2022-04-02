import React, { useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router-dom';
import { Wrapper, Grid, Image, Text, MenuTab } from 'components';

const MyAccount = (props) => {
  const themeContext = useContext(ThemeContext);
  const nickname = localStorage.getItem('nickname');
  const email = localStorage.getItem('email');
  const profileImageUrl = localStorage.getItem('profileImageUrl');
  const navigate = useNavigate();

  const labels = ['게시글', '댓글'];
  const urls = ['/myaccount/boards', '/myaccount/comments'];

  useEffect(() => {
    navigate('/myaccount/boards');
  }, []);

  return (
    <Wrapper backgroundColor={themeContext.colors.backgroundGray}>
      <Grid
        backgroundColor={themeContext.colors.white}
        width="100%"
        style={{
          position: 'relative',
          top: 0,
        }}
      >
        <Grid padding="0px 24px 30px 24px">
          <HeaderWrapper>
            <Grid
              onClick={() => {
                window.location.assign('/settings');
              }}
            >
              <img src="/asset/icons/Settings.svg" alt="setting" />
            </Grid>
          </HeaderWrapper>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image shape="circle" size={108} src={profileImageUrl} />
            <Grid margin="0px 0px 0px 23px">
              <Text semiBold>{nickname}</Text>
              <Text
                small
                color={themeContext.colors.gray2}
                style={{ marginTop: '8px' }}
              >
                {email}
              </Text>
            </Grid>
          </div>
        </Grid>
        <MenuTab
          labels={labels}
          urls={urls}
          highlightColor={themeContext.colors.blue}
          backgroundColor={themeContext.colors.white}
        />
      </Grid>
      <Grid width="100%" style={{ position: 'absolute', height: '100%' }}>
        <Outlet />
      </Grid>
    </Wrapper>
  );
};

MyAccount.propTypes = {
  nickname: PropTypes.string,
};

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: ${({ theme }) => theme.style.header.height};
`;

export default MyAccount;
