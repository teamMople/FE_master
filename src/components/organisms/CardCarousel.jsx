import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Grid, Text, Tile } from 'components';
import { Carousel } from 'react-responsive-carousel';
import styled, { ThemeContext } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { IconButton } from '../atoms';

const CardCarousel = (props) => {
  const { label, type, boards } = props;
  const themeContext = useContext(ThemeContext);

  const isIphoneSE = useMediaQuery({
    query: '(max-width:390px)',
  });
  const date = new Date().getDate();
  const hours = new Date().getHours();
  let filteredBoards = boards.filter(
    (board) =>
      type === 'live' &&
      board.createdAt[2] === date &&
      board.createdAt[3] + 9 - hours < 2,
  );
  return (
    <Grid padding="0px 5px 32px 5px">
      <Grid padding="0px 19px 0px 19px" margin="0px 0px 16px 0px" isFlex>
        <Text bold size="20px">
          {label}
        </Text>
        {type === 'live' && (
          <IconButton
            src={'/asset/icons/Redo.svg'}
            onClick={() => window.location.reload()}
            medium
          />
        )}
      </Grid>
      {isIphoneSE ? (
        <Carousel
          showIndicators={false}
          emulateTouch
          showArrows={false}
          showStatus={false}
          preventMovementUntilSwipeScrollTolerance
          centerMode
          centerSlidePercentage={90}
          showThumbs={false}
          transitionTime={100}
        >
          {type === 'live' ? (
            filteredBoards.length === 0 ? (
              <NoDataWrapper>
                <Text color={themeContext.colors.gray2}>
                  아직 실시간 라이브가 존재하지 않습니다!
                </Text>
              </NoDataWrapper>
            ) : (
              filteredBoards.slice(0, 11).map((board, index) => {
                return (
                  <div key={index}>
                    <Tile type={type} board={board} />
                  </div>
                );
              })
            )
          ) : (
            boards.map((board, index) => {
              return (
                <div key={index}>
                  <Tile type={type} board={board} />
                </div>
              );
            })
          )}
        </Carousel>
      ) : (
        <Carousel
          showIndicators={false}
          emulateTouch
          showArrows={false}
          showStatus={false}
          preventMovementUntilSwipeScrollTolerance
          centerMode
          centerSlidePercentage={80}
          showThumbs={false}
          transitionTime={100}
        >
          {type === 'live' ? (
            filteredBoards.length === 0 ? (
              <NoDataWrapper>
                <Text color={themeContext.colors.gray2}>
                  아직 실시간 라이브가 존재하지 않습니다!
                </Text>
              </NoDataWrapper>
            ) : (
              filteredBoards.slice(0, 11).map((board, index) => {
                return (
                  <div key={index}>
                    <Tile type={type} board={board} />
                  </div>
                );
              })
            )
          ) : (
            boards.map((board, index) => {
              return (
                <div key={index}>
                  <Tile type={type} board={board} />
                </div>
              );
            })
          )}
        </Carousel>
      )}
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

const NoDataWrapper = styled.div`
  margin: 16px 24px;
`;

export default CardCarousel;
