import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Textarea = ({ fluid, ...props }) => {
  return <CustomTextarea fluid={fluid} {...props} />;
};

const CustomTextarea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  resize: none;
  width: ${({ fluid }) => (fluid ? '100%' : 'auto')};
`;

Textarea.defaultProps = {
  // size: 'small',
};

Textarea.propTypes = {
  // size: PropTypes.oneOf(['small', 'medium', 'large']),
  fluid: PropTypes.bool,
};
export default Textarea;
