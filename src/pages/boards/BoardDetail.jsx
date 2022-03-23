import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailAsync, selectedDetail } from 'modules/boards';

import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Wrapper,
  Grid,
  Header,
  Image,
  Text,
  ProfileBox,
  VoteResultBar,
  CommentList,
  CommentInputWindow,
} from 'components';

function BoardDetail(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);
  const detail = useSelector(selectedDetail);
  console.log(detail);

  useEffect(() => {
    dispatch(getDetailAsync(params.boardId));
  }, []);

  return (
    <Wrapper padding="56px 0px 0px 0px">
      <Grid padding="0px 24px 0px 24px">
        <Header label="" leftArrow />
        <Grid margin="8px 0px 0px 0px" padding="2px 0px 2px 0px">
          <Text size="14px" lineHeight="18px" color={themeContext.colors.blue}>
            {detail.category}
          </Text>
        </Grid>
        <Grid padding="8px 0px 8px 0px">
          <Text bold size="16px" lineHeight="24px">
            {detail.title}
          </Text>
        </Grid>
        <ProfileBox
          nickname={detail.nickname}
          profileImageUrl={detail.profileImageUrl}
          createdAt={detail.createdAt}
          padding="8px 0px 16px 0px"
        />
      </Grid>
      <Grid
        width="100%"
        height="1px"
        backgroundColor={themeContext.colors.lightGray}
      />
      <Grid padding="0px 24px 0px 24px">
        <Grid padding="16px 0px 16px 0px" margin="0px 0px 22px 0px">
          {detail.content}
        </Grid>
        <Grid margin="22px 0px 30px 0px">
          <VoteResultBar
            agreeCount={detail.agreeCount}
            disagreeCount={detail.disagreeCount}
          />
        </Grid>
        <Grid margin="0px 0px 30px 0px" style={{ float: 'right' }}>
          <Text size="14px" lineHeight="22px">
            댓글 수 ()
          </Text>
        </Grid>
      </Grid>
      <Grid
        width="100%"
        height="8px"
        backgroundColor={themeContext.colors.lightGray}
      />
      <CommentList boardId={detail.id} />
      <CommentInputWindow boardId={detail.id} />
    </Wrapper>
  );
}

BoardDetail.propTypes = {
  category: PropTypes.string,
  profileImageUrl: PropTypes.string,
  nickname: PropTypes.string,
  createdAt: PropTypes.array,
};

export default BoardDetail;
