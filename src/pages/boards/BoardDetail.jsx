import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  agreeBoardAsync,
  disagreeBoardAsync,
  getDetailAsync,
  selectedAgreeCount,
  selectedDetail,
  selectedDisagreeCount,
  selectedUserVoteStatus,
} from 'modules/boards';
import { clearCommentList } from 'modules/comments';
import apis from 'apis/apis';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Wrapper,
  Grid,
  Header,
  Image,
  Text,
  ProfileBox,
  VoteResultBar,
  CommentList,
  CommentInputWindow,
  KebabMenu,
} from 'components';
import { getCommentListAsync, selectedCommentList } from 'modules/comments';
import { forwardRef } from 'react';

const BoardDetail = (props, ref) => {
  const params = useParams();
  const boardId = parseInt(params.boardId);

  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  const inputRef = useRef(null);

  const detail = useSelector(selectedDetail);
  const comments = useSelector(selectedCommentList);

  const userVoteStatus = useSelector(selectedUserVoteStatus);
  const agreeCount = useSelector(selectedAgreeCount);
  const disagreeCount = useSelector(selectedDisagreeCount);

  const voteInfo = { userVoteStatus, boardId };

  const deleteBoard = () => {};
  const showReportModal = () => {};

  const isMyBoard = (props) => {
    const nickname = localStorage.getItem('nickname');
    if (nickname === detail.nickname) {
      return true;
    } else {
      return false;
    }
  };
  const isPrivateKebabMenu = [true, false];
  const kebabMenuLabels = ['글 삭제하기', '글 신고하기'];
  const kebabMenuOnClicks = [deleteBoard, showReportModal];

  const firebaseMessaging = getMessaging();
  getToken(firebaseMessaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  })
    .then((currentToken) => {
      console.log(currentToken);
      if (currentToken) {
        apis.pushAlarm(currentToken).then((response) => {
          console.log(response);
        });
      } else {
        console.log('not alarm registered');
      }
    })
    .catch((error) => console.log(error));

  onMessage((payload) => {
    console.log('foregroundMessage');
    console.log(payload);
  });

  useEffect(() => {
    dispatch(getDetailAsync(params.boardId));
    dispatch(getCommentListAsync(params.boardId));
    return () => {
      dispatch(clearCommentList());
    };
  }, [dispatch]);

  return (
    <Wrapper padding="0px 0px 0px 0px" ref={ref}>
      <Grid padding="0px 24px 0px 24px">
        <Grid isFlex>
          <Header label="" leftArrow />
          <KebabMenu
            showPrivateMenu={isMyBoard()}
            isPrivateMenu={isPrivateKebabMenu}
            labels={kebabMenuLabels}
            onClicks={kebabMenuOnClicks}
          />
        </Grid>
        <Grid margin="8px 0px 0px 0px" padding="2px 0px 2px 0px">
          {/* <Text size="14px" lineHeight="18px" color={themeContext.colors.blue}>
            {detail.category}
          </Text> */}
        </Grid>
        <Grid padding="8px 0px 8px 0px">
          <Text bold size="16px" lineHeight="24px">
            {detail.title}
          </Text>
        </Grid>
        <ProfileBox
          nickname={detail.nickname}
          profileImageUrl={detail.profileImageUrl}
          createdAt={detail.createdAt}
          padding="8px 0px 16px 0px"
        />
      </Grid>
      <Grid
        width="100%"
        height="1px"
        backgroundColor={themeContext.colors.lightGray}
      />
      <Grid padding="0px 24px 0px 24px">
        <Grid padding="16px 0px 16px 0px" margin="0px 0px 22px 0px">
          <Text preWrap>{detail.content}</Text>
        </Grid>
        {detail.imageUrl && (
          <Grid>
            <Image src={detail.imageUrl} />
          </Grid>
        )}
        <Grid margin="22px 0px 30px 0px">
          <VoteResultBar
            agreeCount={agreeCount}
            disagreeCount={disagreeCount}
            onClickAgree={() => {
              dispatch(agreeBoardAsync(voteInfo));
            }}
            onClickDisagree={() => {
              dispatch(disagreeBoardAsync(voteInfo));
            }}
            selected={userVoteStatus}
          />
        </Grid>
        <Grid right margin="0px 0px 30px 0px">
          <Text size="14px" lineHeight="22px">
            댓글 수 ({comments.length})
          </Text>
        </Grid>
      </Grid>
      <CommentList comments={comments} />
      <CommentInputWindow boardId={boardId} ref={inputRef} />
    </Wrapper>
  );
};

BoardDetail.displayName = 'BoardDetail';

BoardDetail.propTypes = {
  category: PropTypes.string,
  profileImageUrl: PropTypes.string,
  nickname: PropTypes.string,
  createdAt: PropTypes.array,
};

export default BoardDetail;
