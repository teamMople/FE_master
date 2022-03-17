import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Carousel } from '@trendyol-js/react-carousel';

import { Text, Wrapper } from '../atoms';
import { Tile } from '../molecules';

const CardCarousel = (props) => {
  const { label, type, boards } = props;

  return (
    <div style={{ padding: '0px 5px 0px 5px' }}>
      <div style={{ padding: '0px 24px 0px 24px' }}>
        <Text bold size="20px">
          {label}
        </Text>
      </div>
      <Carousel
        show={1.2}
        slide={1}
        swiping={true}
        leftArrow={false}
        rightArrow={false}
      >
        {boards.map((board, index) => {
          return (
            <div key={index}>
              <Tile type={type} board={board} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

CardCarousel.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  boards: PropTypes.array,
};

CardCarousel.defaultProps = {
  label: '제목',
  boards: [],
};

export default CardCarousel;
