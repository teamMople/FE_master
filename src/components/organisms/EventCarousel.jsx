import React from 'react';
import { Grid } from 'components';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

const EventCarousel = () => {
  return (
    <Grid padding="0px 5px 32px 5px">
      <Carousel
        showIndicators
        emulateTouch
        showArrows={false}
        showStatus={false}
        preventMovementUntilSwipeScrollTolerance
        centerMode
        centerSlidePercentage={100}
        showThumbs={false}
        transitionTime={800}
        autoPlay
        infiniteLoop
      >
        <EventImageWrapper>
          <img
            src={'/asset/event/feedback_reward.png'}
            alt="event_image"
            onClick={() => window.open('https://forms.gle/H4dX3qQYKDCstNMp6')}
          />
        </EventImageWrapper>
        <EventImageWrapper>
          <img
            src={'/asset/event/bug_report_reward.png'}
            alt="event_image"
            onClick={() => window.open('https://forms.gle/4rnNPK61UeoYBT996')}
          />
        </EventImageWrapper>
        <EventImageWrapper>
          <img src={'/asset/event/best_reward.png'} alt="event_image" />
        </EventImageWrapper>
      </Carousel>
    </Grid>
  );
};

const EventImageWrapper = styled.div`
  //margin: 16px 24px;
  width: 100%;
  cursor: pointer;

  > img {
    height: 95px;
    object-fit: contain;
    -webkit-user-drag: none;
  }
`;

export default EventCarousel;
