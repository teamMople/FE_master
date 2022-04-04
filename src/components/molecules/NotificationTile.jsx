import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

import { Grid, Text } from 'components';

const NotificationTile = (props) => {
  const { board, message, createdAt } = props;
  const themeContext = useContext(ThemeContext);

  const getDateString = (createdAt) => {
    if (createdAt) {
      const now = new Date();
      const nowTime = parseInt(now.getTime()) / 1000;
      const createdAtTime = parseInt(createdAt) / 1000;
      const result = (nowTime - createdAtTime) / 3600;

      if (result > 24) {
        return parseInt(result / 24) + '일 전';
      } else if (result < 1) {
        return parseInt(result * 60) + '분 전';
      } else {
        return parseInt(result) + '시간 전';
      }
    } else {
      return;
    }
  };

  const getRevisedMessage = (message) => {
    if (message === '새 댓글이 달렸습니다') {
      return '에 새로운 댓글이 달렸습니다';
    } else if (message === '새 대댓글이 달렸습니다') {
      return '에 새로운 답글이 달렸습니다';
    } else if (message === '글 작성') {
      return '의 투표가 진행 중입니다. 진행상황을 확인해보세요!';
    } else if (message === '댓글 작성') {
      return '의 투표가 진행 중입니다. 진행상황을 확인해보세요!';
    } else {
      return;
    }
  };

  return (
    <Grid width="100%" margin="0px 0px 12px 0px">
      <Grid padding="8px 0px 8px 0px">
        <Text
          small
          lineHeight="18px"
          color={themeContext.colors.black}
          padding="8px 0px 8px 8px"
        >
          [{board}]{getRevisedMessage(message)}
        </Text>
      </Grid>
      <Grid margin="0px 0px 8px 0px">
        <Text tiny color={themeContext.colors.gray}>
          {getDateString(createdAt)}
        </Text>
      </Grid>
      <Grid
        width="100%"
        height="1px"
        border="1px solid #000"
        backgroundColor={themeContext.colors.lightGray}
      />
    </Grid>
  );
};

NotificationTile.propTypes = {
  board: PropTypes.string,
  message: PropTypes.string,
  createdAt: PropTypes.any,
};

export default NotificationTile;
