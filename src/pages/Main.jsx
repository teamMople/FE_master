import React from 'react';
import { Wrapper } from '../components/atoms';
import Nav from './Nav';

const Main = (props) => {
  return (
    <>
      <Wrapper padding="53px 24px 0px 24px">
        <div>메인 페이지</div>
      </Wrapper>
      <Nav />
    </>
  );
};

export default Main;
