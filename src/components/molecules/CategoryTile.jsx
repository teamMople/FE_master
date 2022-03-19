import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Text } from 'components';

const CategoryTile = (props) => {
  return (
    <Tile {...props}>
      <Text className="categoryLabel">{props.category}</Text>
    </Tile>
  );
};

CategoryTile.propTypes = {
  category: PropTypes.string,
  categoryImageUrl: PropTypes.string,
};

CategoryTile.defaultProps = {
  width: '160px',
  height: '95px',
  borderRadius: '20px',
};

const Tile = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  background-image: url('${(props) => props.categoryImageUrl}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  > .categoryLabel {
    padding: 57px 20px 80px 20px;
    line-height: 16.65px;
    font-size: 14px;
    color: #fff;
    font-weight: 600;
  }
`;

export default CategoryTile;
