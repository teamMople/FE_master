import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';
import SuitRegular from '../assets/font/SUIT-Regular.otf';
import SuitBold from '../assets/font/SUIT-Bold.otf';
import SuitMedium from '../assets/font/SUIT-Medium.otf';
import SuitLight from '../assets/font/SUIT-Light.otf';
import { isBrowser } from 'react-device-detect';

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
// eslint-disable-next-line react-hooks/rules-of-hooks
const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    height: 100%;
    font-size: 14px;
  }
  body {
    height: inherit;
    //overflow: hidden;
    // background-color: ${({ theme }) => theme.colors.blue};
    background-image: ${isBrowser && `url('/asset/image/bg.png')`} ;
    background-repeat: no-repeat;
    background-size: cover;
  }
  #root {
    height: inherit;
  }

  * {
    font-family: 'Suit', sans-serif;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 14px;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    //color: #282828;
    //line-height: 1;
  }
  ul {
    //margin-block-start: 0;
    //margin-block-end: 0;
    //padding-inline-start: 0;
  }
  .carousel .slide img {
    width: unset;
    vertical-align: unset;
    border: unset;
  }
  .carousel img {
    width: unset;
    display: unset;
    pointer-events: unset;
  }
  .carousel-root {
    height: 100%;
    >div {
      height: inherit;
      > div {
        height: inherit;
        >ul {
          height: inherit;
        }
      }
    }
    
    //&.room_carousel {
    //  li:first-child{
    //    height: calc(100vh - 156px);
    //  }
    //}
  }
  
  @font-face {
    font-family: 'Suit';
    font-weight: 400;
    src: url(${SuitRegular});
  }
  
  @font-face {
    font-family: 'Suit';
    font-weight: 500;
    src: url(${SuitMedium});
  }
  
  
  @font-face {
    font-family: 'Suit';
    font-weight: 300;
    src: url(${SuitLight});
  }
  
  
  @font-face {
    font-family: 'Suit';
    font-weight: 700;
    src: url(${SuitBold});
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
