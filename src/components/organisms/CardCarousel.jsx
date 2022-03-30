import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Text, Tile } from 'components';
import { Carousel } from 'react-responsive-carousel';

const CardCarousel = (props) => {
  const { label, type, boards } = props;

  return (
    <Grid padding="0px 5px 32px 5px">
      <Grid padding="0px 19px 0px 19px" margin="0px 0px 16px 0px">
        <Text bold size="20px">
          {label}
        </Text>
      </Grid>
      <Carousel
        showIndicators={false}
        emulateTouch
        showArrows={false}
        showStatus={false}
        preventMovementUntilSwipeScrollTolerance
        centerMode
        showThumbs={false}
        transitionTime={100}
        // show={1.2}
        // slide={1}
        // swiping={true}
        // leftArrow={false}
        // rightArrow={false}
      >
        {boards.map((board, index) => {
          return (
            <div key={index}>
              <Tile type={type} board={board} />
            </div>
          );
        })}
      </Carousel>
    </Grid>
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
