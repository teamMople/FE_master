import React from 'react';
import PropTypes from 'prop-types';
import { Grid, CommentBox } from 'components';

const CommentList = (props) => {
  const { comments } = props;

  return (
    <React.Fragment>
      <Grid>
        {comments &&
          comments.map((comment, index) => {
            return <CommentBox key={index} comment={comment} />;
          })}
      </Grid>
      <Grid width="100%" height="84px" />
    </React.Fragment>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array,
  replyComments: PropTypes.array,
};

export default CommentList;
