import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

import { Wrapper, Grid, CategoryTile, SearchInput } from 'components';

function SearchBoard(props) {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Wrapper
      backgroundColor={themeContext.colors.backgroundGray}
      padding="56px 24px 0px 24px"
    >
      <SearchInput />
      <Grid margin="32px 0px 89px 0px">
        <CategoryWrapper>
          {categories.map((cat, index) => {
            return (
              <CategoryTile
                key={index}
                category={cat.category}
                categoryImageUrl={cat.categoryImageUrl}
                width="148px"
                height="88px"
                borderRadius="20px"
                onClick={() => {
                  navigate('/category/' + cat.category.replace('/', ''));
                }}
              />
            );
          })}
        </CategoryWrapper>
        <Outlet />
      </Grid>
    </Wrapper>
  );
}

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 18px;
  column-gap: 18px;
`;

const categories = [
  {
    category: '직장생활',
    categoryImageUrl: '/asset/image/category/office.png',
  },
  {
    category: '학교생활',
    categoryImageUrl: '/asset/image/category/school.png',
  },
  {
    category: '관계/심리',
    categoryImageUrl: '/asset/image/category/relation.png',
  },
  {
    category: '일상생활',
    categoryImageUrl: '/asset/image/category/office.png',
  },
  {
    category: '시사/이슈',
    categoryImageUrl: '/asset/image/category/trends.png',
  },
  {
    category: '기타',
    categoryImageUrl: '/asset/image/category/etc.png',
  },
];

export default SearchBoard;
