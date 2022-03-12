import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

const Text = (props) => {
  const { font, bold, color, size, children } = props;

  const styles = {
    font: font,
    bold: bold,
    color: color,
    size: size,
  };

  return <P {...styles}>{children}</P>;
};

Text.propTypes = {
  font: PropTypes.string,
  bold: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.any,
};

Text.defaultProps = {
  bold: false,
  color: '#222831',
  size: '14px',
};

const P = styled.p`
  color: ${(props) => props.color};
  font-family: ${(props) => props.font};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  cursor: pointer;

  ${(props) =>
    props._onClick
      ? css`
          cursor: pointer;
        `
      : css``}
`;

export default Text;
