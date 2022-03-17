import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Carousel } from '@trendyol-js/react-carousel';

import { Text, Wrapper } from '../atoms';
import { CategoryTile } from '../molecules';
import url from 'sockjs-client/lib/utils/url';

const CategoryCarousel = (props) => {
  const { label, categories } = props;

  return (
    <div style={{ padding: '0px 5px 0px 5px' }}>
      <div style={{ padding: '0px 24px 0px 24px' }}>
        <Text bold size="20px">
          {label}
        </Text>
      </div>
      <Carousel
        show={2.2}
        slide={2}
        swiping={true}
        leftArrow={false}
        rightArrow={false}
      >
        {categories.map((cat, index) => {
          return (
            <CategoryTile
              key={index}
              category={cat.category}
              categoryImageUrl={cat.categoryImageUrl}
            />
          );
        })}
      </Carousel>
    </div>
  );
};

CategoryCarousel.propTypes = {
  label: PropTypes.string,
  categories: PropTypes.array,
};

CategoryCarousel.defaultProps = {
  label: '제목',
  categories: [
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
  ],
};

export default CategoryCarousel;
