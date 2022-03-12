import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';
import NotoRegular from '../assets/font/NotoSansKR-Regular.otf';
import NotoBold from '../assets/font/NotoSansKR-Bold.otf';
import NotoMedium from '../assets/font/NotoSansKR-Medium.otf';
import NotoLight from '../assets/font/NotoSansKR-Light.otf';

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
    font-family: 'Noto Sans', sans-serif;
    box-sizing: border-box;
    //line-height: 1;
  }
  @font-face {
    font-family: 'Noto Sans';
    font-weight: 400;
    src: url(${NotoRegular});
  }
  
  @font-face {
      font-family: 'Noto Sans';
      font-weight: 500;
    src: url(${NotoMedium});
  }
  
  
  @font-face {
      font-family: 'Noto Sans';
      font-weight: 300;
    src: url(${NotoLight});
  }
  
  
  @font-face {
      font-family: 'Noto Sans';
      font-weight: 700;
    src: url(${NotoBold});
  }
`;

export default GlobalStyle;
