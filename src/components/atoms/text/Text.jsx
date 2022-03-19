import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

const Text = (props) => {
  return <P {...props}>{props.children}</P>;
};

Text.propTypes = {
  children: PropTypes.any,
};

Text.defaultProps = {
  children: '',
};

const P = styled.div`
  color: ${(props) => props.color};
  font-family: ${(props) => props.font};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? '700' : '500')};
  line-height: ${(props) => props.lineHeight};
  cursor: pointer;

  ${(props) =>
    props._onClick
      ? css`
          cursor: pointer;
        `
      : css``}
`;

export default Text;
