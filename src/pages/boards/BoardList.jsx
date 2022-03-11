import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tile from '../../components/molecules/Tile';
import { getBoardListAsync, selectBoardListState } from '../../modules/boards';

function BoardList(props) {
  const { data, status } = useSelector(selectBoardListState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardListAsync());
  }, []);

  return;
}

export default BoardList;
