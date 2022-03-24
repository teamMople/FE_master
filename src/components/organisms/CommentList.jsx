import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Grid, Button, ProfileBox, CommentBox } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentListAsync, selectedCommentList } from 'modules/comments';

const CommentList = (props) => {
  const { comments } = props;
  console.log(comments);
  const themeContext = useContext(ThemeContext);

  return (
    <React.Fragment>
      <Grid>
        {comments.map((comment, index) => {
          return <CommentBox key={index} comment={comment} />;
        })}
      </Grid>
      <Grid width="100%" height="84px" />
    </React.Fragment>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array,
};

export default CommentList;
