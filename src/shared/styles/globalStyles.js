import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';
import SuitRegular from '../assets/font/SUIT-Regular.otf';
import SuitBold from '../assets/font/SUIT-Bold.otf';
import SuitMedium from '../assets/font/SUIT-Medium.otf';
import SuitLight from '../assets/font/SUIT-Light.otf';

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    height: 100%;
    font-size: 14px;
  }
  body {
    height: inherit;
    //overflow: hidden;
    //background-color: #ddd;
  }
  #root {
    height: inherit;
  }

  * {
    font-family: 'Suit', sans-serif;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 14px;
    //color: #282828;
    //line-height: 1;
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
