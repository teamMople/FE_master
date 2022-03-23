import React, { useEffect, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import {
  Wrapper,
  Grid,
  Input,
  CategoryTile,
  MenuTab,
  Header,
} from 'components';

function BoardByCategoryList(props) {
  const params = useParams();
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);
  const labels = ['라이브토론', '일반토론'];
  const urls = [
    '/category/' + params.categoryName + '/live',
    '/category/' + params.categoryName + '/general',
  ];

  useEffect(() => {
    navigate('/category/' + params.categoryName + '/live');
  }, []);

  return (
    <Wrapper
      backgroundColor={themeContext.colors.backgroundGray}
      padding="56px 0px 0px 0px"
    >
      <Grid padding="0px 24px 12px 24px">
        <Header label={params.categoryName} leftArrow />
      </Grid>
      <MenuTab
        labels={labels}
        urls={urls}
        highlightColor={themeContext.colors.blue}
        backgroundColor={themeContext.colors.backgroundGray}
      />
      <Grid width="100%" style={{ position: 'absolute' }}>
        <Outlet />
      </Grid>
    </Wrapper>
  );
}

const categories = [
  {
    category: '직장생활',
    categoryImageUrl: '/asset/image/category/office.svg',
  },
  {
    category: '학교생활',
    categoryImageUrl: '/asset/image/category/school.svg',
  },
  {
    category: '관계/심리',
    categoryImageUrl: '/asset/image/category/relation.svg',
  },
  {
    category: '일상생활',
    categoryImageUrl: '/asset/image/category/life.svg',
  },
  {
    category: '시사/이슈',
    categoryImageUrl: '/asset/image/category/trends.svg',
  },
  {
    category: '기타',
    categoryImageUrl: '/asset/image/category/etc.svg',
  },
];

export default BoardByCategoryList;
