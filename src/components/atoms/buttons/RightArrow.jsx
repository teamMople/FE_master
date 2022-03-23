import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RightArrow = ({ rightArrowOnClick, active }) => {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate(1);
  };

  return (
    <ArrowWrapper
      active={active}
      onClick={rightArrowOnClick ? rightArrowOnClick : handleArrowClick}
    >
      <IconWrapper>
        <img src={'/asset/icons/left_arrow.svg'} alt={'icon'} />
      </IconWrapper>
    </ArrowWrapper>
  );
};

RightArrow.propTypes = {
  rightArrowOnClick: PropTypes.func,
  active: PropTypes.bool,
};
const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

  > img {
    transform: rotate(180deg);
  }
`;

export default RightArrow;
