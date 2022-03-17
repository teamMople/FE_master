import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

function Image({ ...props }) {
  if (props.shape === 'circle') {
    return <CircleImage {...props} />;
  }

  if (props.shape === 'retangle') {
    return (
      <AspectOuter {...props}>
        <AspectInner {...props} />
      </AspectOuter>
    );
  }
}

Image.propTypes = {
  shape: PropTypes.oneOf(['circle', 'retangle']),
};

Image.defaultProps = {
  shape: 'retangle',
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
  background-color: #f1f1f1;
  border: ${(props) => props.border};
`;

export default Image;
