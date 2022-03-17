import React from 'react';
import { Wrapper, Input } from '../../components/atoms';
import { CategoryTile } from '../../components/molecules';

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

function SearchBoard(props) {
  return (
    <div
      style={{
        backgroundColor: '#F8F8F8',
        height: '100vh',
        overflowX: 'hidden',
        overfloxY: 'hidden',
      }}
    >
      <Wrapper padding="45px 24px 0px 24px">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ width: '90%' }}>
            <Input width="100%" height={24} />
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
              stroke="#C4C4C4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 15L21 21"
              stroke="#C4C4C4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {categories.map((cat, index) => {
            return (
              <CategoryTile
                key={index}
                category={cat.category}
                categoryImageUrl={cat.categoryImageUrl}
              />
            );
          })}
        </div>
      </Wrapper>
    </div>
  );
}

export default SearchBoard;
