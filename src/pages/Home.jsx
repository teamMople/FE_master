import React, { useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Loader } from 'components';
import Nav from './Nav';
import {
  CardCarousel,
  CategoryCarousel,
  BoardList,
} from '../components/organisms';
import {
  clearBoardList,
  getBoardListAsync,
  getLiveBoardListAsync,
  selectedBoardList,
  selectedLiveBoardList,
} from 'modules/boards';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentListAsync } from 'modules/comments';

const Home = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();

  const { data: basicBoards, status: basicBoardsStatus } =
    useSelector(selectedBoardList);
  const { data: liveBoards, status: liveBoardsStatus } = useSelector(
    selectedLiveBoardList,
  );

  React.useEffect(() => {
    dispatch(getBoardListAsync());
    dispatch(getLiveBoardListAsync());
  }, [dispatch]);

  console.log(basicBoards);
  console.log(basicBoardsStatus);
  console.log(liveBoards);
  console.log(liveBoardsStatus);

  if (basicBoardsStatus !== 'success' || liveBoardsStatus !== 'success') {
    return (
      <Wrapper>
        <Loader type="dot" />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper backgroundColor={themeContext.colors.backgroundGray}>
        <Grid padding="45px 0px 30px 0px">
          <CardCarousel
            label="실시간 HOT 라이브"
            type="live"
            boards={liveBoards}
          />
          <BoardList label="HOT 게시글" boards={basicBoards} />
          <CardCarousel
            label="내가 참여 중인 토론방"
            type="basic"
            boards={basicBoards}
          />
          <CardCarousel
            label="보플 Pick 토론방"
            type="basic"
            boards={basicBoards}
          />
          <CategoryCarousel label="카테고리 둘러보기" />
        </Grid>
      </Wrapper>
    );
  }
};

export default Home;
