import React, { useState } from 'react';
import styled from 'styled-components';

const Nav = (props) => {
  const [show, setShow] = useState(false);

  const showCreateMenu = () => {
    setShow(!show);
  };
  return (
    <NavWrapper>
      <CreateButton onClick={showCreateMenu}>
        <div>+</div>
      </CreateButton>
      {show && (
        <CreateMenu show={show}>
          <div>일반토론</div>
          <div>LIVE토론</div>
        </CreateMenu>
      )}
      <MenuWrapper>
        <div>home</div>
        <div>search</div>
        <div>noti</div>
        <div>myPage</div>
      </MenuWrapper>
    </NavWrapper>
  );
};

//!Todo 디자인 시안 나오면 체계적으로 정리 예정
const CreateMenu = styled.div`
  ${(props) => props.show} {
    opacity: 1;
  }
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 150%;
  display: flex;
  width: 150px;
  justify-content: space-evenly;
  opacity: 0;
  transition: all 0.5s ease;

  > div {
    padding: 6px 10px;
    background-color: aliceblue;
  }
`;
const NavWrapper = styled.div`
  position: relative;
`;
const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 54px;
  background-color: ${({ theme }) => theme.colors.primary};

  > div {
    width: 25%;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CreateButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 10em;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 50%;

  cursor: pointer;
`;

export default Nav;
