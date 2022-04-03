import React, { useContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLiveBoardListAsync,
  getLiveBoardListByCategoryAsync,
  selectedLiveBoardList,
} from '../../modules/boards';

import { Wrapper, Grid, Tile, Text } from 'components';
import { useParams } from 'react-router-dom';

function LiveBoardList(props) {
  const params = useParams();
  const { data, status } = useSelector(selectedLiveBoardList);
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    if (typeof params.categoryName === 'undefined') {
      dispatch(getLiveBoardListAsync());
    } else {
      dispatch(getLiveBoardListByCategoryAsync(params.categoryName));
    }
    return dispatch;
  }, [dispatch]);

  return (
    <NewWrapper>
      {data.length !== 0 ? (
        <Grid
          center
          backgroundColor={themeContext.colors.backgroundGray}
          padding="32px 24px 0px 24px"
        >
          {data.map((board, index) => {
            return (
              <Grid key={index} padding="0px 0px 16px 0px">
                <Tile type="live" board={board} />
              </Grid>
            );
          })}
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
      {/*<Grid*/}
      {/*  height="89px"*/}
      {/*  backgroundColor={themeContext.colors.backgroundGray}*/}
      {/*></Grid>*/}
    </NewWrapper>
  );
}
const NewWrapper = styled(Wrapper)`
  height: 100%;
  > div {
    padding-top: 120px;
  }
`;

export default LiveBoardList;
