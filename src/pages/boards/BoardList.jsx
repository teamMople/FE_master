import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearBoardList,
  getBoardListAsync,
  getBoardListByCategoryAsync,
  getMyBoardListAsync,
  getMyCommentListAsync,
  selectedBoardList,
} from 'modules/boards';

import { Wrapper, Grid, Tile, Text } from 'components';
import { useLocation, useParams } from 'react-router-dom';

function BoardList(props) {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  const { data, status } = useSelector(selectedBoardList);

  useEffect(() => {
    if (location.pathname === '/myaccount/boards') {
      dispatch(getMyBoardListAsync());
    } else if (location.pathname === '/myaccount/mycomments') {
      dispatch(getMyCommentListAsync());
    } else if (typeof params.categoryName === 'undefined') {
      dispatch(getBoardListAsync());
    } else {
      dispatch(getBoardListByCategoryAsync(params.categoryName));
    }
    return () => {
      dispatch(clearBoardList());
    };
  }, [dispatch, location]);

  return (
    <Wrapper>
      {data.length !== 0 ? (
        <Grid
          backgroundColor={themeContext.colors.backgroundGray}
          style={{ minHeight: '100%' }}
        >
          <Grid
            center
            backgroundColor={themeContext.colors.backgroundGray}
            padding="32px 24px 0px 24px"
          >
            {data.map((board, index) => {
              return (
                <Grid key={index} padding="0px 0px 16px 0px">
                  <Tile type="basic" board={board} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ) : (
        <Grid
          backgroundColor={themeContext.colors.backgroundGray}
          style={{
            height: '100%',
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

export default BoardList;
