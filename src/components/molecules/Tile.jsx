import React from 'react';
import { Grid, Text, Heart } from '../atoms';

const Tile = (props) => {
  return (
    <Grid>
      <Text>{props}</Text>
      <Heart />
    </Grid>
  );
};

export default Tile;
