import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Grid, ReplyCommentBox } from 'components';

const ReplyCommentList = (props) => {
  const { replyComments } = props;
  const themeContext = useContext(ThemeContext);

  return (
    <Grid width="100%">
      {replyComments.map((reply, index) => {
        <ReplyCommentBox key={index} replyComment={reply} />;
      })}
    </Grid>
  );
};

ReplyCommentList.propTypes = {
  replyComments: PropTypes.array,
};

export default ReplyCommentList;
