import React from 'react';
import { Text } from 'components';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SetMemberCount = ({
  count,
  disabledIncrease,
  disabledDecrease,
  onClickIncrease,
  onClickDecrease,
}) => {
  return (
    <MemberCountWrapper>
      <CustomButton disabled={disabledDecrease} onClick={onClickDecrease}>
        -
      </CustomButton>
      <Text large>{count}</Text>
      <CustomButton disabled={disabledIncrease} onClick={onClickIncrease}>
        +
      </CustomButton>
    </MemberCountWrapper>
  );
};

SetMemberCount.propTypes = {
  count: PropTypes.number,
  disabledIncrease: PropTypes.bool,
  disabledDecrease: PropTypes.bool,
  onClickIncrease: PropTypes.func,
  onClickDecrease: PropTypes.func,
};

const MemberCountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 20px;
`;

const CustomButton = styled.button`
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.black};
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  border-radius: 10em;
  font-size: 1rem;
  transition: all 0.2s ease;
  &:active {
    background-color: ${({ theme }) => theme.colors.gray};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.gray};
  }
`;
export default SetMemberCount;
