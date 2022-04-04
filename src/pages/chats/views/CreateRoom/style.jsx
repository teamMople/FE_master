import styled from 'styled-components';
import { Wrapper } from 'components';

// export const SlideUpWrapper = styled.div`
//   position: fixed;
//   z-index: ${({ onClickSetting }) => (onClickSetting ? '15' : '10')};
//   top: 40%;
//   width: 100%;
//   height: 100%;
//   visibility: hidden;
//   background-color: ${({ theme }) => theme.colors.lightGray};
//   transition: all 0.2s ease;
//   transform: translateY(60%);
//   border-radius: 30px 30px 0 0;
//
//   &.active {
//     transform: translateY(0);
//     visibility: visible;
//   }
// `;
export const CustomWrapper = styled(Wrapper)`
  position: fixed;
  z-index: 11;
  top: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.2s ease;
  transform: translateY(100%);
  opacity: 0;

  &.active {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }
`;
export const SelectOptionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
  margin-top: 16px;
`;
export const SelectOption = styled.div`
  border-radius: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.blue};
  border: 1px solid ${({ theme }) => theme.colors.blue};
  padding: 5px;
  text-align: center;
  &.active {
    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
  }
`;
export const ContentWrapper = styled.div`
  padding: 24px;
`;
export const ParticipantCountWrapper = styled.div`
  margin: 32px 0;
  > .count-participants {
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
  .horizontal-slider {
    .slider-track-0 {
      border-radius: 10em;
      background-color: ${({ theme }) => theme.colors.primaryYellow};
      height: 10px;
    }
    .slider-track-1 {
      border-radius: 10em;
      background-color: ${({ theme }) => theme.colors.gray};
      height: 10px;
    }
    .slider-mark {
      background-color: #282c34;
      width: 2px;
      height: 10px;
    }
    .slider-thumb {
      width: 22px;
      height: 22px;
      border: 1px solid ${({ theme }) => theme.colors.primaryYellow};
      background-color: ${({ theme }) => theme.colors.white};
      box-shadow: 0 1px 1px 0 ${({ theme }) => theme.colors.gray};
      border-radius: 10em;
      top: -6px;
      &.slider-thumb-active {
        outline: none;
      }
    }
  }
`;

export const BodyWrapper = styled.div`
  padding: 0 24px;
`;
export const TextareaWrapper = styled.div`
  padding: 10px 0;
`;

export const SlideUpWrapper = styled.div`
  position: fixed;
  z-index: 12;
  top: 40%;
  width: 100%;
  height: 100%;
  visibility: hidden;
  background-color: ${({ theme }) => theme.colors.lightGray};
  transition: all 0.2s ease;
  transform: translateY(60%);
  border-radius: 30px 30px 0 0;

  &.active {
    transform: translateY(0);
    visibility: visible;
  }
`;
