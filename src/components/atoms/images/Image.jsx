import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

function Image(props) {
  const { _onClick, shape, size, src } = props;

  const styles = {
    shape,
    size,
    src,
  };

  if (shape === 'circle') {
    return <CircleImage {...styles} onClick={_onClick} />;
  }

  if (shape === 'retangle') {
    return (
      <AspectOuter {...styles}>
        <AspectInner {...styles} size={size} />
      </AspectOuter>
    );
  }
}

Image.propTypes = {
  _onClick: PropTypes.func,
  shape: PropTypes.oneOf(['circle', 'retangle']),
  size: PropTypes.number,
  src: PropTypes.string,
};

Image.defaultProps = {
  _onClick: null,
  shape: 'retangle',
  size: 75,
  src: null,
};

const AspectOuter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

const CircleImage = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url('${(props) => props.src}');
  background-size: cover;
  cursor: pointer;
  background-color: #a0aec0;
`;

export default Image;
