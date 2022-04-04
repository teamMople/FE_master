import React, { useEffect, useContext, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  agreeBoardAsync,
  clearDetail,
  disagreeBoardAsync,
  getDetailAsync,
  selectedAgreeCount,
  selectedDetail,
  selectedDisagreeCount,
  selectedUserVoteStatus,
} from 'modules/detail';
import { clearCommentList } from 'modules/comments';

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
  KebabMenu,
  ToggleButton,
} from 'components';
import { getCommentListAsync, selectedCommentList } from 'modules/comments';

const BoardDetail = (props, ref) => {
  const params = useParams();
  const boardId = parseInt(params.boardId);

  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  const inputRef = useRef(null);

  const detail = useSelector(selectedDetail);
  const comments = useSelector(selectedCommentList);
  const userVoteStatus = useSelector(selectedUserVoteStatus);
  const agreeCount = useSelector(selectedAgreeCount);
  const disagreeCount = useSelector(selectedDisagreeCount);

  const [showComments, setShowComments] = useState(false);

  const voteInfo = { userVoteStatus, boardId };

  const deleteBoard = () => {};
  const showReportModal = () => {};

  const isMyBoard = (props) => {
    const nickname = localStorage.getItem('nickname');
    if (nickname === detail.nickname) {
      return true;
    } else {
      return false;
    }
  };
  const isPrivateKebabMenu = [true, false];
  const kebabMenuLabels = ['글 삭제하기', '글 신고하기'];
  const kebabMenuOnClicks = [deleteBoard, showReportModal];

  useEffect(() => {
    dispatch(getDetailAsync(params.boardId));
    dispatch(getCommentListAsync(params.boardId));

    return () => {
      dispatch(clearDetail());
      dispatch(clearCommentList());
    };
  }, [dispatch]);

  return (
    <Wrapper
      backgroundColor={themeContext.colors.white}
      padding="0px 0px 0px 0px"
      ref={ref}
    >
      <Grid padding="0px 24px 0px 24px">
        <Grid isFlex>
          <Header label="" leftArrow />
          <KebabMenu
            showPrivateMenu={isMyBoard()}
            isPrivateMenu={isPrivateKebabMenu}
            labels={kebabMenuLabels}
            onClicks={kebabMenuOnClicks}
          />
        </Grid>
        <Grid margin="8px 0px 0px 0px" padding="2px 0px 2px 0px">
          {/* <Text size="14px" lineHeight="18px" color={themeContext.colors.blue}>
            {detail.category}
          </Text> */}
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
          <Text preWrap>{detail.content}</Text>
        </Grid>
        {detail.imageUrl && (
          <Grid>
            <Image src={detail.imageUrl} />
          </Grid>
        )}
        <Grid margin="22px 0px 30px 0px">
          <VoteResultBar
            agreeCount={agreeCount}
            disagreeCount={disagreeCount}
            onClickAgree={() => {
              dispatch(agreeBoardAsync(voteInfo));
            }}
            onClickDisagree={() => {
              dispatch(disagreeBoardAsync(voteInfo));
            }}
            selected={userVoteStatus}
          />
        </Grid>
        <Grid isFlex right margin="0px 0px 30px 0px">
          <Text style={{ marginRight: '20px' }}>
            댓글 수 ({comments.length})
          </Text>
          <ToggleButton
            active={showComments}
            onClick={() => setShowComments(!showComments)}
          />
        </Grid>
      </Grid>
      {showComments && <CommentList comments={comments} />}
      <CommentInputWindow boardId={boardId} ref={inputRef} />
    </Wrapper>
  );
};

BoardDetail.displayName = 'BoardDetail';

BoardDetail.propTypes = {
  category: PropTypes.string,
  profileImageUrl: PropTypes.string,
  nickname: PropTypes.string,
  createdAt: PropTypes.array,
};

export default BoardDetail;
