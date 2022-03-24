import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LeftArrow = ({ leftArrowOnClick, active }) => {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate(-1);
  };

  return (
    <ArrowWrapper
      active={active}
      onClick={leftArrowOnClick ? leftArrowOnClick : handleArrowClick}
    >
      <IconWrapper>
        <img src={'/asset/icons/left_arrow.svg'} alt={'icon'} />
      </IconWrapper>
      {/*<Svg*/}
      {/*  width="24"*/}
      {/*  height="24"*/}
      {/*  viewBox="0 0 24 24"*/}
      {/*  fill="none"*/}
      {/*  xmlns="http://www.w3.org/2000/svg"*/}
      {/*>*/}
      {/*  <Path {...props} d="M14.5 17L9.5 12L14.5 7" />*/}
      {/*</Svg>*/}
    </ArrowWrapper>
  );
};

LeftArrow.propTypes = {
  leftArrowOnClick: PropTypes.func,
  active: PropTypes.bool,
};

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 24px;
  visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
  cursor: pointer;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;
// const Svg = styled.svg``;
//
// const Path = styled.path`
//   ${(props) =>
//     props.active
//       ? css`
//           stroke: #4f4f4f;
//           stroke-width: 1.5;
//           stroke-linecap: round;
//           stroke-linejoin: round;
//         `
//       : css`
//           stroke: transparent;
//           stroke-width: 1.5;
//           stroke-linecap: round;
//           stroke-linejoin: round;
//         `}
// `;

export default LeftArrow;
