import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCombinedBoardList,
  searchBoardAsync,
  searchLiveBoardAsync,
  selectedCombinedBoardList,
} from 'modules/combinedBoards';
import queryString from 'query-string';

import { Wrapper, Grid, Tile, Text, Loader } from 'components';
import { useLocation } from 'react-router-dom';

function CombinedBoardList(props) {
  const { search } = useLocation();
  const { keyword } = queryString.parse(search);
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  const { data, status } = useSelector(selectedCombinedBoardList);
  console.log(data);

  useEffect(() => {
    dispatch(searchBoardAsync(keyword));
    dispatch(searchLiveBoardAsync(keyword));

    return () => {
      console.log('clear');
      dispatch(clearCombinedBoardList());
      console.log(data);
    };
  }, [dispatch, keyword]);

  if (status !== 'success') {
    return <Loader type="dot" />;
  } else {
    return (
      <Wrapper>
        {data.length !== 0 ? (
          <Grid
            backgroundColor={themeContext.colors.backgroundGray}
            style={{ minHeight: '100vh' }}
          >
            <Grid
              center
              backgroundColor={themeContext.colors.backgroundGray}
              padding="32px 24px 0px 24px"
            >
              {data.map((board, index) => {
                if (board.type === 'basic') {
                  return (
                    <Grid key={index} padding="0px 0px 16px 0px">
                      <Tile type="basic" board={board} />
                    </Grid>
                  );
                } else if (board.type === 'live') {
                  return (
                    <Grid key={index} padding="0px 0px 16px 0px">
                      <Tile type="live" board={board} />
                    </Grid>
                  );
                } else {
                  return;
                }
              })}
            </Grid>
          </Grid>
        ) : (
          <Grid
            backgroundColor={themeContext.colors.backgroundGray}
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text color={themeContext.colors.blue}>검색 결과가 없습니다</Text>
          </Grid>
        )}

        <Grid
          height="89px"
          backgroundColor={themeContext.colors.backgroundGray}
        ></Grid>
      </Wrapper>
    );
  }
}

export default CombinedBoardList;
