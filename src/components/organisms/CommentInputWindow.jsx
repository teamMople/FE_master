import React, {
  useContext,
  useState,
  useCallback,
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

  const textareaRef = useRef();
  const handleAutoResize = useCallback(() => {
    textareaRef.current.style.height = '30px';
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + 'px';
    return scrollHeight;
  }, []);

  const commentInfo = { boardId, content };

  return (
    <AutoResizeWindow
      show={isClosed}
      height={66 + handleAutoResize + 'px'}
      {...props}
    >
      <Grid
        isFlex
        width="100%"
        padding="8px 24px 24px 24px"
        style={{ alignItems: 'flex-start' }}
      >
        <Grid width="100%">
          <textarea
            ref={textareaRef}
            autoFocus
            placeholder="댓글을 입력하세요"
            value={content}
            onChange={changeContent}
            onInput={handleAutoResize}
            style={{
              width: '100%',
              maxHeight: '120px',
              height: '30px',
              border: 'none',
              resize: 'none',
              borderRadius: '10px',
              backgroundColor: '#F8F8F8',
              padding: '6px 12px 6px 12px',
              overflowY: 'auto',
            }}
          />
        </Grid>

        <Button
          ref={ref}
          shape={'rounded'}
          size={'tiny'}
          fontSize={'14px'}
          height={'30px'}
          backgroundColor={themeContext.colors.backgroundGray}
          color={themeContext.colors.blue}
          margin="0px 0px 0px 16px"
          onClick={(e) => {
            e.preventDefault();
            setContent('');
            dispatch(createCommentAsync(commentInfo));
          }}
        >
          완료
        </Button>
      </Grid>
    </AutoResizeWindow>
  );
};

CommentInputWindow.propTypes = {
  boardId: PropTypes.number,
  autoResize: PropTypes.bool,
};

const AutoResizeWindow = styled.div`
  visibility: ${(props) => (props.show ? 'hidden' : 'visible')};

  position: fixed;
  bottom: 54px;
  width: 100%;
  height: ${(props) => props.height};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px 20px 0px 0px;
  box-sizing: border-box;
  transition: 0.3s ease;
  filter: drop-shadow(0px -2px 4px rgba(0, 0, 0, 0.05));
`;

export default forwardRef(CommentInputWindow);
