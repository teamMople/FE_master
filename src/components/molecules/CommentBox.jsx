import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Grid, Text, Button, ProfileBox } from 'components';

const CommentBox = (props) => {
  const { comment } = props;
  const themeContext = useContext(ThemeContext);

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
          width="58px"
          height={32}
          backgroundColor={themeContext.colors.lightGray}
        >
          <Grid margin="0px 5px 0px 0px">
            <img src="/asset/icons/Join.svg" />
          </Grid>
          <Text>{comment.recommendCount}</Text>
        </Button>
        <Button
          width="58px"
          height={32}
          backgroundColor={themeContext.colors.lightGray}
        >
          <Grid margin="0px 5px 0px 0px">
            <img src="/asset/icons/Agreed.svg" />
          </Grid>
          <Text>{comment.recommendCount}</Text>
        </Button>
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
    commentId: PropTypes.number,
  }),
};

export default CommentBox;
