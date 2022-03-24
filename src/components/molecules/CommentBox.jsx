import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Grid, Text, Button, ProfileBox } from 'components';
import ReplyCommentBox from './ReplyCommentBox';
import ReplyCommentList from 'components/organisms/ReplyCommentList';
import {
  getReplyCommentListAsync,
  selectedReplyCommentList,
} from 'modules/comments';

const CommentBox = (props) => {
  const { comment } = props;
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const replyComments = useSelector(selectedReplyCommentList);

  useEffect(() => {
    dispatch(getReplyCommentListAsync(comment.commentId));
  }, []);

  return (
    <Grid width="100%">
      <Grid margin="0px 0px 8px 0px">
        <ProfileBox
          profileImageUrl={comment.profileImageUrl}
          nickname={comment.nickname}
          createdAt={comment.createdAt}
        />
      </Grid>
      <Grid>
        <Text>{comment.content}</Text>
      </Grid>
      <Grid>
        <Button
          width="49px"
          height={26}
          backgroundColor={themeContext.colors.lightGray}
        >
          <Grid margin="0px 5px 0px 0px">
            <img src="/asset/icons/Join.svg" />
          </Grid>
          <Text>{comment.recommendCount}</Text>
        </Button>
        <Button
          width="49px"
          height={26}
          backgroundColor={themeContext.colors.lightGray}
        >
          <Grid margin="0px 5px 0px 0px">
            <img src="/asset/icons/Agreed.svg" />
          </Grid>
          <Text>{comment.recommendCount}</Text>
        </Button>
      </Grid>
      <ReplyCommentList replyComments={replyComments} />
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
    commentId: PropTypes.number,
  }),
};

export default CommentBox;
