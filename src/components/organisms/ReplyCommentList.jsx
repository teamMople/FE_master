import React from 'react';
import PropTypes from 'prop-types';
import { Grid, ReplyCommentBox } from 'components';

const ReplyCommentList = (props) => {
  const { replyComments } = props;

  return (
    <Grid width="100%">
      {replyComments.length !== 0 &&
        replyComments.map((reply, index) => {
          return <ReplyCommentBox key={index} replyComment={reply} />;
        })}
    </Grid>
  );
};

ReplyCommentList.propTypes = {
  replyComments: PropTypes.array,
};

export default ReplyCommentList;
