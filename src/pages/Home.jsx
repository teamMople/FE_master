import React, { useContext } from 'react';

import styled, { ThemeContext } from 'styled-components';
import {
  Wrapper,
  Grid,
  BasicModal,
  PageLoading,
  Text,
  Button,
  EventCarousel,
} from 'components';
import {
  CardCarousel,
  CategoryCarousel,
  BoardList,
} from '../components/organisms';
import {
  clearBoardList,
  getBoardListAsync,
  selectedBoardList,
} from 'modules/boards';
import {
  clearLiveBoardList,
  getLiveBoardListAsync,
  selectedLiveBoardList,
} from 'modules/liveBoards';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalOpen, setModalOpen } from 'modules/modal';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  if (basicBoardsStatus === 'loading' || liveBoardsStatus === 'loading') {
    return (
      <Wrapper backgroundColor={themeContext.colors.white}>
        <PageLoading />
      </Wrapper>
    );
  } else if (basicBoardsStatus === 'failed' || liveBoardsStatus === 'failed') {
    return (
      <Wrapper backgroundColor={themeContext.colors.white}>
        <BackDrop />
        <ErrorPageWrapper>
          <Text>로그인 시간이 만료되었습니다.</Text>
          <Text>다시 로그인 해주세요!</Text>
          <Button
            secondary
            onClick={() => navigate('/login', { replace: true })}
          >
            로그인 화면으로 이동
          </Button>
        </ErrorPageWrapper>
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
            <EventCarousel />
            <CardCarousel
              label="내가 참여 중인 토론방"
              type="basic"
              boards={basicBoards}
            />
            {/*<CardCarousel
              label="보플 Pick 토론방"
              type="basic"
              boards={basicBoards}
            />*/}
            <CategoryCarousel label="카테고리 둘러보기" />
          </Grid>
        </Wrapper>
      </>
    );
  }
};

const ErrorPageWrapper = styled.div`
  position: fixed;
  z-index: 21;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  row-gap: 8px;
  > button {
    margin-top: 16px;
  }
`;
const BackDrop = styled.div`
  position: fixed;
  height: 100%;
  z-index: 20;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s ease;
  opacity: 0.7;
`;

export default Home;
