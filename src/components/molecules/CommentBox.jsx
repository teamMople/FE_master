import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Grid, Text, Button, Textarea, ProfileBox } from 'components';

import ReplyCommentList from 'components/organisms/ReplyCommentList';
import {
  increaseCommentRecommendCountAsync,
  getReplyCommentListAsync,
  createReplyCommentAsync,
  selectedReplyCommentList,
} from 'modules/comments';

const CommentBox = (props) => {
  const { comment } = props;
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const replyComments = useSelector(selectedReplyCommentList);
  const commentId = comment.commentId;

  const [isVisible, setIsVisible] = useState(false);
  const [replyContent, setReplyContent] = useState();

  const changeReplyContent = (e) => {
    setReplyContent(e.target.value);
  };

  useEffect(() => {
    dispatch(getReplyCommentListAsync(commentId));
  }, [dispatch]);

  return (
    <Grid width="100%">
      <Grid
        width="100%"
        height="8px"
        backgroundColor={themeContext.colors.lightGray}
      />
      <Grid padding="16px 24px 16px 24px" margin="0px 0px 8px 0px">
        <Grid margin="0px 0px 8px 0px">
          <ProfileBox
            profileImageUrl={comment.profileImageUrl}
            nickname={comment.nickname}
            createdAt={comment.createdAt}
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
              size={'small'}
              width="49px"
              height="26px"
              backgroundColor={themeContext.colors.lightGray}
              onClick={() => {
                setIsVisible(!isVisible);
              }}
            >
              <Grid margin="0px 5px 0px 0px">
                <img src="/asset/icons/Comment_replynumber.svg" />
              </Grid>
              <Text>{replyComments.length}</Text>
            </Button>
            <Button
              size={'small'}
              width="49px"
              height="26px"
              margin="0px 0px 0px 8px"
              backgroundColor={themeContext.colors.lightGray}
              onClick={(e) => {
                dispatch(increaseCommentRecommendCountAsync(commentId));
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
              size={'small'}
              height="26px"
              backgroundColor={themeContext.colors.lightGray}
              color={themeContext.colors.blue}
              margin="0px 0px 0px 8px"
              onClick={(e) => {
                e.preventDefault();
                const replyCommentInfo = { commentId, replyContent };
                dispatch(createReplyCommentAsync(replyCommentInfo));
              }}
            >
              완료
            </Button>
          </Grid>
        )}
        <ReplyCommentList replyComments={replyComments} />
      </Grid>
    </Grid>
  );
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
