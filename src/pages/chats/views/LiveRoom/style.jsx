import styled, { keyframes } from 'styled-components';

export const FixedTop = styled.div`
  position: fixed;
  top: 0;
  z-index: 15;
  width: 100%;
  //background-color: #61dafb;
  background-color: ${({ theme }) => theme.colors.white};
`;
export const CarouselWrapper = styled.div`
  padding-top: 148px;
  height: 100%;
  //height: calc(100% - 148px);

  .slider-wrapper {
    > ul {
      > li {
        background-color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;
export const BackDrop = styled.div`
  position: fixed;
  height: 100%;
  z-index: 11;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;

  &.active {
  opacity: 0.5;
  visibility: visible;
`;
export const BoardWrapper = styled.div`
  height: calc(100% - 78px);
  overflow-y: auto;
`;
export const BoardContentWrapper = styled.div`
  margin: 16px 24px;
  min-height: 200px;
`;
export const VoteResultBarWrapper = styled.div`
  margin: 16px 24px;
`;
export const RoomWrapper = styled.div`
  //position: fixed;
  //bottom: 0;
  //z-index: 12;
  width: 100%;
  //height: 90%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px 20px 0 0;
  transition: all 0.3s ease;
  //transform: translateY(100%);

  &.active {
    transform: translateY(0);
  }
`;
export const InnerWrapper = styled.div`
  margin: 20px 24px;
  padding: 10px 0;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-row-gap: 13px;
  justify-items: center;
  height: calc(100% - 76px);
  overflow-y: auto;
`;
export const TopButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 24px;
`;
export const RoomInfoWrapper = styled.div`
  margin: 20px 24px;
`;
export const StatusWrapperChat = styled.div`
  display: flex;
  column-gap: 8px;
  margin: 16px 0 8px 0;
`;
export const BottomButtonGroup = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 21px 24px;
  background-color: ${({ theme }) => theme.colors.white};
`;
export const ParticipantControlButton = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.primaryYellow};
  font-size: 10px;
  border-radius: 10em 0 10em 10em;
  padding: 4px 10px;
  top: 66px;
  right: 29px;
  white-space: nowrap;
`;
export const RoomInnerButton = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 10em;
  padding: 7.5px 10px;
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

export const CircleButtons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;
export const MyStateWrapper = styled.div`
  position: absolute;
  top: -10px;
  white-space: nowrap;
  right: 24px;
  background-color: ${({ theme }) => theme.colors.primaryYellow};
  padding: 4px 6px;
  border-radius: 4px;
  > div:first-child {
    position: relative;
    z-index: 2;
  }
  > div:last-child {
    width: 15px;
    height: 15px;
    transform: rotate(45deg);
    position: absolute;
    bottom: -2px;
    right: 5px;
    background-color: ${({ theme }) => theme.colors.primaryYellow};
  }
`;

export const StatusWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;
export const TitleWrapper = styled.div`
  margin-bottom: 16px;
`;

const shakeHand = keyframes`
  0%{
    //transform: rotate(-30deg);
    transform: scale(1);
  }
  100%{
    //transform: rotate(30deg);
    transform: scale(1.2);
  }
`;

export const HandIcon = styled.div`
  position: absolute;
  top: 54px;
  right: -0.5px;
  animation-name: ${shakeHand};
  animation-duration: 0.3s;
  //animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;
