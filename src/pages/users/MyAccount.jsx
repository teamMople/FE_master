import React, { useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Wrapper, Grid, Image, Text, MenuTab } from 'components';

const MyAccount = (props) => {
  const themeContext = useContext(ThemeContext);
  const nickname = localStorage.getItem('nickname');
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
        padding="51px 0px 0px 0px"
        backgroundColor={themeContext.colors.white}
        width="100%"
        style={{
          position: 'relative',
          top: 0,
        }}
      >
        <Grid padding="0px 24px 30px 24px">
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Link to="/settings">
              <img src="/asset/icons/Settings.svg" />
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image shape="circle" size={108} src={profileImageUrl} />
            <Grid margin="0px 0px 0px 23px">
              <Text bold size="14px" lineHeight="18px">
                {nickname}
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
      <Grid width="100%" style={{ position: 'absolute' }}>
        <Outlet />
      </Grid>
    </Wrapper>
  );
};

MyAccount.propTypes = {
  nickname: PropTypes.string,
};

export default MyAccount;
