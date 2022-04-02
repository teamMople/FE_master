import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Grid, Text, Button, ProfileBox, KebabMenu } from 'components';
import { useDispatch } from 'react-redux';
import { recommendReplyCommentAsync } from 'modules/comments';

const ReplyCommentBox = (props) => {
  const { replyComment } = props;

  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();

  const commentId = replyComment.commentId;
  const replyId = replyComment.replyId;

  const isMyComment = () => {
    const nickname = localStorage.getItem('nickname');
    if (nickname === replyComment.nickname) {
      return true;
    } else {
      return false;
    }
  };

  const deleteComment = () => {};

  const showReportModal = () => {};

  const isPrivateKebabMenu = [true, false];
  const kebabMenuLabels = ['댓글 삭제하기', '댓글 신고하기'];
  const kebabMenuOnClicks = [deleteComment, showReportModal];

  const ids = { commentId, replyId };

  return (
    <Grid isFlex width="100%" margin="0px 0px 8px 6px">
      <Grid margin="0px 10px 0px 0px">
        <img src="/asset/icons/Reply.svg" />
      </Grid>
      <Grid
        rounded
        width="100%"
        padding="16px 24px"
        backgroundColor={themeContext.colors.backgroundGray}
      >
        <Grid
          isFlex
          margin="0px 0px 8px 0px"
          style={{
            alignItems: 'flex-start',
          }}
        >
          <ProfileBox
            profileImageUrl={replyComment.profileImageUrl}
            nickname={replyComment.nickname}
            createdAt={replyComment.createdAt}
          />
          <KebabMenu
            showPrivateMenu={isMyComment()}
            isPrivateMenu={isPrivateKebabMenu}
            labels={kebabMenuLabels}
            onClicks={kebabMenuOnClicks}
          />
        </Grid>
        <Grid>
          <Text small>{replyComment.content}</Text>
        </Grid>
        <Grid right>
          <Button
            size={'tiny'}
            height="26px"
            margin="0px 0px 0px 8px"
            backgroundColor={themeContext.colors.white}
            rounded
            onClick={(e) => {
              dispatch(recommendReplyCommentAsync(ids));
            }}
          >
            <Grid margin="0px 5px 0px 0px">
              <img src="/asset/icons/Comment_recommend.svg" />
            </Grid>
            <Text>{replyComment.recommendCount}</Text>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

ReplyCommentBox.propTypes = {
  replyComment: PropTypes.shape({
    commentId: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.array,
    memberId: PropTypes.number,
    nickname: PropTypes.string,
    profileImageUrl: PropTypes.string,
    recommendCount: PropTypes.number,
    replyId: PropTypes.number,
  }),
};

export default ReplyCommentBox;
