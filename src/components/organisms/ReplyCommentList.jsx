import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Grid, Button, ProfileBox, CommentBox } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReplyCommentListAsync,
  selectedCommentList,
} from 'modules/comments';

const ReplyCommentList = (props) => {
  const { commentId } = props;
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);
  const comments = useSelector(selectedCommentList);
  console.log(comments);

  useEffect(() => {
    dispatch(getReplyCommentListAsync(commentId));
  }, [dispatch]);

  return (
    <Grid width="100%">
      {comments.map((comment, index) => {
        <CommentBox key={index} comment={comment} />;
      })}
    </Grid>
  );
};

ReplyCommentList.propTypes = {
  commentId: PropTypes.number,
};

export default ReplyCommentList;
