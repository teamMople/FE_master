import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardItem from '../../components/organisms/BoardItem';
import { getBoardListAsync, selectBoardListState } from '../../modules/boards';

function BoardList(props) {
  const { data, status } = useSelector(selectBoardListState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardListAsync());
  }, []);

  return (
    <>
      {data.map((b, idx) => {
        return <BoardItem item={b} key={idx} />;
      })}
    </>
  );
}

export default BoardList;
