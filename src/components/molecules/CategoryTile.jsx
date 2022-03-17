import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Text } from '../atoms';

const CategoryTile = (props) => {
  return <Tile {...props}>{props.category}</Tile>;
};

CategoryTile.propTypes = {
  category: PropTypes.string,
  categoryImageUrl: PropTypes.string,
};

const Tile = styled.div`
  width: 160px;
  height: 95px;
  border-radius: 20px;
  background-image: url('${(props) => props.categoryImageUrl}');
  background-repeat: no-repeat;
  background-position: center;

  padding: 57px 20px 80px 20px;
  line-height: 18px;
  font-size: 16px;
  color: #fff;
  font-weight: 600;
`;

export default CategoryTile;
