import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

function Image(props) {
  const { _onClick, shape, size, src } = props;

  if (shape === 'circle') {
    return <CircleImage size={size} onClick={_onClick} />;
  }

  if (shape === 'retangle') {
    return (
      <AspectOuter style={{ position: 'relative' }}>
        <AspectInner size={size} />
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
  src: 'https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb81cbca1649556026b3c72a3ee9382429b',
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
  background-color: #eee;
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

export default Image;
