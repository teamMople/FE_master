import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SectionWrapper = ({ children }) => {
  return <CustomWrapper>{children}</CustomWrapper>;
};

const CustomWrapper = styled.div`
  padding: 32px 24px 24px 24px;
  height: ${({ theme }) => `calc(100% - ${theme.style.header.height})`};
  margin-top: ${({ theme }) => `${theme.style.header.height}`};
  overflow-y: auto;
`;

SectionWrapper.propTypes = {
  children: PropTypes.any,
};

export default SectionWrapper;
