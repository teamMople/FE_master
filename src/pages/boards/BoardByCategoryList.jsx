import React, { useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { Wrapper, Grid, MenuTab, Header } from 'components';
import PropTypes from 'prop-types';

function BoardByCategoryList({ from, to }) {
  const params = useParams();
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);
  const labels = ['라이브토론', '일반토론'];
  const urls = [
    to + params.categoryName + '/live',
    to + params.categoryName + '/general',
  ];

  useEffect(() => {
    navigate(to + params.categoryName + '/live');
  }, []);

  return (
    <NewWrapper>
      <HeaderWrapper>
        <Grid padding="0px 24px 12px 24px">
          <Header
            label={params.categoryName}
            leftArrow
            leftArrowOnClick={() => {
              navigate(from);
            }}
          />
        </Grid>
        <MenuTab
          labels={labels}
          urls={urls}
          highlightColor={themeContext.colors.blue}
          backgroundColor={themeContext.colors.backgroundGray}
        />
      </HeaderWrapper>
      <Grid width="100%" style={{ height: '100%' }}>
        <Outlet />
      </Grid>
    </NewWrapper>
  );
}

BoardByCategoryList.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
};

const NewWrapper = styled(Wrapper)`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
`;
const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 5;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
`;

export default BoardByCategoryList;
