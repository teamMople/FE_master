import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

import { Wrapper, Grid, Input, CategoryTile } from 'components';

function SearchBoard(props) {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Wrapper
      backgroundColor={themeContext.colors.backgroundGray}
      padding="56px 24px 0px 24px"
    >
      <Grid width="100%" style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          color={themeContext.colors.black}
          backgroundColor={themeContext.colors.backgroundGray}
          width="100%"
          height="36px"
        />
        <Grid padding="0px 0px 0px 10px">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
              stroke={themeContext.colors.gray}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 15L21 21"
              stroke={themeContext.colors.gray}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Grid>
      </Grid>
      <Grid margin="32px 0px 89px 0px">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            rowGap: '18px',
            columnGap: '16px',
          }}
        >
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
        </div>
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

export default SearchBoard;
