import React, { useContext, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Grid, Text, Button, Textarea, ProfileBox, Loader } from 'components';

import ReplyCommentList from 'components/organisms/ReplyCommentList';
import {
  getReplyCommentListAsync,
  clearReplyCommentList,
  createReplyCommentAsync,
  selectedReplyCommentList,
  recommendCommentAsync,
} from 'modules/comments';
import { KebabMenu } from '.';

const CommentBox = (props) => {
  const { comment } = props;
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const commentId = comment.commentId;

  const { status: replyCommentListStatus, data: replyCommentList } =
    useSelector(selectedReplyCommentList);
  const replyCommentListByCommentId = replyCommentList.filter(
    (reply) => reply.commentId === commentId,
  )[0]?.list;

  useEffect(() => {
    dispatch(getReplyCommentListAsync(commentId));
    return () => {
      dispatch(clearReplyCommentList());
    };
  }, [dispatch, commentId]);

  const [isVisible, setIsVisible] = useState(false);
  const [replyContent, setReplyContent] = useState();

  const changeReplyContent = (e) => {
    setReplyContent(e.target.value);
  };

  const deleteComment = () => {};

  const showReportModal = () => {};

  const isMyComment = () => {
    const nickname = localStorage.getItem('nickname');
    if (nickname === comment.nickname) {
      return true;
    } else {
      return false;
    }
  };
  const isPrivateKebabMenu = [true, false];
  const kebabMenuLabels = ['댓글 삭제하기', '댓글 신고하기'];
  const kebabMenuOnClicks = [deleteComment, showReportModal];

  const replyCommentInfo = { commentId, replyContent };

  if (
    replyCommentListStatus === 'idle' ||
    replyCommentListStatus === 'loading'
  ) {
    return (
      <Grid center width="100%">
        <Loader type="dot" backgroundColor={themeContext.colors.blue} />
      </Grid>
    );
  } else if (replyCommentListStatus === 'success') {
    return (
      <Grid width="100%">
        <Grid
          width="100%"
          height="8px"
          backgroundColor={themeContext.colors.lightGray}
        />
        <Grid padding="16px 24px 16px 24px" margin="0px 0px 8px 0px">
          <Grid
            isFlex
            margin="0px 0px 8px 0px"
            style={{
              alignItems: 'flex-start',
            }}
          >
            <ProfileBox
              profileImageUrl={comment.profileImageUrl}
              nickname={comment.nickname}
              createdAt={comment.createdAt}
            />
            <KebabMenu
              showPrivateMenu={isMyComment()}
              isPrivateMenu={isPrivateKebabMenu}
              labels={kebabMenuLabels}
              onClicks={kebabMenuOnClicks}
            />
          </Grid>
          <Grid margin="0px 0px 6px 0px">
            <Text size="12px" lineHeight="18px">
              {comment.content}
            </Text>
          </Grid>
          <Grid right>
            <Grid isFlex>
              <Button
                size={'tiny'}
                height="26px"
                backgroundColor={themeContext.colors.backgroundGray}
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
              >
                <Grid margin="0px 5px 0px 0px">
                  <img src="/asset/icons/Comment_replynumber.svg" />
                </Grid>
                <Text>
                  {replyCommentListByCommentId
                    ? replyCommentListByCommentId.length
                    : 0}
                </Text>
              </Button>
              <Button
                size={'tiny'}
                height="26px"
                margin="0px 0px 0px 8px"
                backgroundColor={themeContext.colors.backgroundGray}
                onClick={(e) => {
                  dispatch(recommendCommentAsync(commentId));
                }}
              >
                <Grid margin="0px 5px 0px 0px">
                  <img src="/asset/icons/Comment_recommend.svg" />
                </Grid>
                <Text>{comment.recommendCount}</Text>
              </Button>
            </Grid>
          </Grid>
          {isVisible && (
            <Grid>
              <Grid isFlex width="100%" padding="8px 0px 24px 6px">
                <Grid margin="0px 10px 0px 0px">
                  <img src="/asset/icons/Reply.svg" />
                </Grid>
                <Textarea
                  fluid
                  height="34px"
                  backgroundColor={themeContext.colors.backgroundGray}
                  border="none"
                  borderRadius="10px"
                  placeholder="댓글을 입력하세요"
                  padding="8px 12px 8px 12px"
                  onChange={changeReplyContent}
                />
                <Button
                  size={'tiny'}
                  height="30px"
                  backgroundColor={themeContext.colors.backgroundGray}
                  color={themeContext.colors.blue}
                  margin="0px 0px 0px 8px"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(createReplyCommentAsync(replyCommentInfo));
                  }}
                >
                  <Text color={themeContext.colors.blue}>완료</Text>
                </Button>
              </Grid>
              <ReplyCommentList replyComments={replyCommentListByCommentId} />
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  } else {
    return <div></div>;
  }
};

CommentBox.propTypes = {
  comment: PropTypes.shape({
    commentId: PropTypes.number,
    memberId: PropTypes.string,
    nickname: PropTypes.string,
    profileImageUrl: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.array,
    recommendCount: PropTypes.number,
  }),
};

export default CommentBox;
