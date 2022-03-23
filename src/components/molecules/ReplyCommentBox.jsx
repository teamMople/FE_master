import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Grid, Text, Button, ProfileBox } from 'components';

const ReplyCommentBox = (props) => {
  const { replyComment } = props;
  const themeContext = useContext(ThemeContext);

  return (
    <Grid width="100%">
      <Grid margin="0px 0px 8px 0px">
        <ProfileBox
          profileImageUrl={replyComment.profileImageUrl}
          nickname={replyComment.nickname}
          createdAt={replyComment.createdAt}
        />
      </Grid>
      <Grid>
        <Text>{replyComment.content}</Text>
      </Grid>
      <Grid>
        <Button
          width="58px"
          height={32}
          backgroundColor={themeContext.colors.lightGray}
        >
          <Grid margin="0px 5px 0px 0px">
            <img src="/asset/icons/Join.svg" />
          </Grid>
          <Text>{}</Text>
        </Button>
        <Button
          width="58px"
          height={32}
          backgroundColor={themeContext.colors.lightGray}
        >
          <Grid margin="0px 5px 0px 0px">
            <img src="/asset/icons/Agreed.svg" />
          </Grid>
          <Text>{replyComment.recommendCount}</Text>
        </Button>
      </Grid>
    </Grid>
  );
};

ReplyCommentBox.propTypes = {
  replyComment: PropTypes.shape({
    replyId: PropTypes.number,
    commentId: PropTypes.number,
    memberId: PropTypes.string,
    nickname: PropTypes.string,
    profileImageUrl: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.array,
    recommendCount: PropTypes.number,
  }),
};

export default ReplyCommentBox;
