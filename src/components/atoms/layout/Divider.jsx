import React from 'react';
import styled from 'styled-components';

const Divider = () => {
  return <D></D>;
};

const D = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;
export default Divider;
