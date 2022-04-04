import React, {
  useContext,
  useState,
  useEffect,
  forwardRef,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { useDispatch } from 'react-redux';
import { createCommentAsync } from '../../modules/comments';
import { Grid, Button, Textarea } from 'components';

const CommentInputWindow = (props, { ref }) => {
  const { boardId } = props;
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [isClosed, setIsClosed] = useState(false);
  const [content, setContent] = useState('');
  const [scrollHeight, setScrollHeight] = useState(0);

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const commentInfo = { boardId, content };

  const windowRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setScrollHeight(textareaRef.current.scrollHeight);
  }, [content]);

  return (
    <Window
      show={isClosed}
      height={120 + scrollHeight + 'px'}
      ref={windowRef}
      {...props}
    >
      <Grid isFlex width="100%" padding="8px 24px 24px 24px">
        {/* <textarea
          ref={textareaRef}
          onChange={changeContent}
          style={{ overflow: 'hidden', resize: 'none' }}
        /> */}
        <Textarea
          fluid
          height={34 + scrollHeight + 'px'}
          backgroundColor={themeContext.colors.backgroundGray}
          border="none"
          borderRadius="10px"
          placeholder="댓글을 입력하세요"
          padding="8px 12px 8px 12px"
          onChange={changeContent}
          ref={textareaRef}
        />
        <Button
          ref={ref}
          shape={'rounded'}
          size={'small'}
          width={'30px'}
          backgroundColor={themeContext.colors.backgroundGray}
          color={themeContext.colors.blue}
          margin="0px 0px 0px 16px"
          onClick={(e) => {
            e.preventDefault();
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
  autoResize: PropTypes.bool,
};

const Window = styled.div`
  visibility: ${(props) => (props.show ? 'hidden' : 'visible')};

  position: fixed;
  bottom: 0;
  width: 100%;
  height: ${(props) => props.height}; // 66+54
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px 20px 0px 0px;
  filter: drop-shadow(0px -2px 4px rgba(0, 0, 0, 0.05));
`;

export default forwardRef(CommentInputWindow);
