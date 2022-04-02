import React, { useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Loader, BasicModal } from 'components';
import {
  CardCarousel,
  CategoryCarousel,
  BoardList,
} from '../components/organisms';
import {
  clearBoardList,
  clearLiveBoardList,
  getBoardListAsync,
  getLiveBoardListAsync,
  selectedBoardList,
  selectedLiveBoardList,
} from 'modules/boards';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalOpen, setModalOpen } from 'modules/modal';

const Home = () => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();

  const { data: basicBoards, status: basicBoardsStatus } =
    useSelector(selectedBoardList);
  const { data: liveBoards, status: liveBoardsStatus } = useSelector(
    selectedLiveBoardList,
  );
  const modalState = useSelector(selectModalOpen);

  React.useEffect(() => {
    dispatch(getBoardListAsync());
    dispatch(getLiveBoardListAsync());
    return () => {
      dispatch(clearBoardList());
      dispatch(clearLiveBoardList());
    };
  }, [dispatch]);

  if (basicBoardsStatus !== 'success' || liveBoardsStatus !== 'success') {
    return (
      <Wrapper>
        <Loader type="dot" />
      </Wrapper>
    );
  } else {
    return (
      <>
        {/* 라이브 종료 팝업 ::start:: */}
        <BasicModal
          open={modalState.open}
          onClose={() => dispatch(setModalOpen(false))}
          onConfirm={() => dispatch(setModalOpen(false))}
        >
          방장이 라이브를 종료하였습니다.
        </BasicModal>
        {/* 라이브 종료 팝업 ::end:: */}
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
      </>
    );
  }
};

export default Home;
