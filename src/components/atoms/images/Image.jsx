import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Image({ ...props }) {
  if (props.shape === 'circle') {
    return <CircleImage {...props} />;
  }

  if (props.shape === 'rectangle') {
    return (
      <AspectOuter {...props}>
        <AspectInner {...props} />
      </AspectOuter>
    );
  }
}

Image.propTypes = {
  shape: PropTypes.oneOf(['circle', 'rectangle']),
};

Image.defaultProps = {
  shape: 'rectangle',
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
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

const CircleImage = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray};
  border: ${(props) => props.border};
`;

export default Image;
