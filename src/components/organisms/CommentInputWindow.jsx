import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext, keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import { createCommentAsync } from '../../modules/comments';
import { Grid, Button, Input, Textarea, Text, ProfileBox } from 'components';

const CommentInputWindow = (props) => {
  const { boardId } = props;
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [isClosed, setIsClosed] = useState(false);
  const [content, setContent] = useState('');

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const commentInfo = { boardId, content };

  return (
    <Window show={isClosed}>
      <Grid isFlex width="100%" padding="8px 24px 24px 24px">
        <Textarea
          fluid
          backgroundColor={themeContext.colors.backgroundGray}
          border="none"
          borderRadius="10px"
          placeholder="댓글을 입력하세요"
          padding="8px 12px 8px 12px"
          onChange={changeContent}
          margin="0px 20px 0px 0px"
        />
        <Button
          width="57px"
          height={30}
          backgroundColor={themeContext.colors.lightGray}
          color={themeContext.colors.blue}
          onClick={() => {
            dispatch(createCommentAsync(commentInfo));
          }}
        >
          완료
        </Button>
      </Grid>
    </Window>
  );
};

CommentInputWindow.propTypes = {
  boardId: PropTypes.number,
};

const Window = styled.div`
  visibility: ${(props) => (props.show ? 'hidden' : 'visible')};

  position: fixed;
  bottom: 0;
  width: 100%;
  height: 138px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px 20px 0px 0px;
  filter: drop-shadow(0px -2px 4px rgba(0, 0, 0, 0.05));
`;

export default CommentInputWindow;
