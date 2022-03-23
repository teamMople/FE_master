import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Grid, Button, ProfileBox, CommentBox } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentListAsync, selectedCommentList } from 'modules/comments';

const CommentList = (props) => {
  const { boardId } = props;
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);
  const comments = useSelector(selectedCommentList);
  console.log(comments);

  useEffect(() => {
    dispatch(getCommentListAsync(boardId));
  }, [dispatch]);

  return (
    <Grid width="100%">
      {comments.map((comment, index) => {
        <CommentBox key={index} comment={comment} />;
      })}
    </Grid>
  );
};

CommentList.propTypes = {
  boardId: PropTypes.number,
};

export default CommentList;
