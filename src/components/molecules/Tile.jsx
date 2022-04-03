import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ThemeContext } from 'styled-components';
import { Grid, Text, ProfileImageStack, ProfileBox } from 'components';
import { useNavigate } from 'react-router-dom';
import StatusBox from './StatusBox';
import { joinRoomAsync } from '../../modules/chat';
import { useDispatch } from 'react-redux';

const Tile = (props) => {
  const { type, board } = props;
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEnterRoom = async (
    roomId,
    roomName,
    moderatorNickname,
    participantCount,
    role,
  ) => {
    const nickname = localStorage.getItem('nickname');
    const data = {
      roomId: roomId,
      memberName: nickname,
      role: role,
      participantCount: participantCount,
    };
    await dispatch(
      joinRoomAsync({
        data,
        memberName: nickname,
        role: role,
      }),
    )
      .then((res) => navigate(`/room/${res.payload.roomId}`))
      .catch((error) => console.error(error));
  };
  switch (type) {
    case 'live':
      return (
        <LiveTileWrapper
          onClick={() =>
            handleEnterRoom(
              board.roomId,
              board.roomName,
              board.moderatorNickname,
              board.maxParticipantCount,
              'PUBLISHER',
            )
          }
          style={{
            pointerEvents:
              board.maxParticipantCount ===
                board.participantsNicknames.length && 'none',
          }}
        >
          {board.maxParticipantCount === board.participantsNicknames.length && (
            <WarningJoinRoomBox>
              <Text bold color={themeContext.colors.white}>
                인원이 꽉 찼습니다!
              </Text>
            </WarningJoinRoomBox>
          )}
          <Grid margin="0px 0px 18px 0px">
            <ProfileImageStack
              nicknames={board.participantsNicknames}
              imageUrls={Object.values(board.participantsProfileImageUrls)}
            />
          </Grid>
          <Grid margin="0px 0px 14px 0px">
            <Text
              bold
              color={themeContext.colors.black}
              size="14px"
              lineHeight="18px"
            >
              {board.roomName && board.roomName.length > 22
                ? board.roomName.slice(0, 22) + '...'
                : board.roomName}
            </Text>
          </Grid>
          <Grid height={40}>
            <Text
              color={themeContext.colors.darkGray}
              size="12px"
              lineHeight="20px"
            >
              {board.content && board.content.length > 57
                ? board.content.slice(0, 57) + '...'
                : board.content}
            </Text>
          </Grid>
          <Grid isFlex width="252px" className="buttonGroup">
            <Grid isFlex>
              <StatusBox
                live
                // icon={'/asset/icons/Join.svg'}
                count={
                  board.participantsNicknames.length < 1
                    ? '0'
                    : board.participantsNicknames.length
                }
              />
            </Grid>
            <Grid isFlex>
              <Grid margin="0px 8px 0px 0px">
                <StatusBox
                  icon={
                    localStorage.getItem('theme') === 'dark'
                      ? '/asset/icons/Agreed_white.svg'
                      : '/asset/icons/Agreed.svg'
                  }
                  count={board.agreeCount < 1 ? '0' : board.agreeCount}
                />
              </Grid>
              <Grid>
                <StatusBox
                  icon={
                    localStorage.getItem('theme') === 'dark'
                      ? '/asset/icons/Disagreed_white.svg'
                      : '/asset/icons/Disagreed.svg'
                  }
                  count={board.disagreeCount < 1 ? '0' : board.disagreeCount}
                />
              </Grid>
            </Grid>
          </Grid>
        </LiveTileWrapper>
      );
    case 'basic':
      return (
        <BasicTileWrapper>
          <ProfileBox
            profileImageUrl={board.profileImageUrl}
            nickname={board.nickname}
            createdAt={board.createdAt}
            margin="0px 0px 18px 0px"
          />
          <Grid
            onClick={() => {
              navigate('/board/' + board.id);
            }}
          >
            <Grid margin="0px 0px 14px 0px">
              <Text
                bold
                color={themeContext.colors.black}
                size="14px"
                lineHeight="18px"
              >
                {board.title && board.title.length > 22
                  ? board.title.slice(0, 22) + '...'
                  : board.title}
              </Text>
            </Grid>
            <Grid height={40}>
              <Text
                color={themeContext.colors.darkGray}
                size="12px"
                lineHeight="20px"
              >
                {board.content && board.content.length > 57
                  ? board.content.slice(0, 57) + '...'
                  : board.content}
              </Text>
            </Grid>
          </Grid>
          <Grid isFlex width="252px" className="buttonGroup">
            <Grid isFlex>
              <StatusBox
                icon={
                  localStorage.getItem('theme') === 'dark'
                    ? '/asset/icons/Vote_white.svg'
                    : '/asset/icons/Vote.svg'
                }
                count={board.commentCount < 1 ? '0' : board.commentCount}
              />
            </Grid>
            <Grid isFlex>
              <Grid margin="0px 8px 0px 0px">
                <StatusBox
                  backgroundColor={
                    board.userStatus === '찬성'
                      ? themeContext.colors.lightGreen
                      : themeContext.colors.lightGray
                  }
                  icon={
                    localStorage.getItem('theme') === 'dark'
                      ? '/asset/icons/Agreed_white.svg'
                      : '/asset/icons/Agreed.svg'
                  }
                  count={board.agreeCount < 1 ? '0' : board.agreeCount}
                />
              </Grid>
              <Grid>
                <StatusBox
                  backgroundColor={
                    board.userStatus === '반대'
                      ? themeContext.colors.orange
                      : themeContext.colors.lightGray
                  }
                  icon={
                    localStorage.getItem('theme') === 'dark'
                      ? '/asset/icons/Disagreed_white.svg'
                      : '/asset/icons/Disagreed.svg'
                  }
                  count={board.disagreeCount < 1 ? '0' : board.disagreeCount}
                />
              </Grid>
            </Grid>
          </Grid>
        </BasicTileWrapper>
      );
    default:
      return;
  }
};

Tile.propTypes = {
  type: PropTypes.string.isRequired,
  board: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    roomName: PropTypes.string,
    content: PropTypes.string,
    selected: PropTypes.bool,
    imageUrls: PropTypes.array,
    nickname: PropTypes.string,
    profileImageUrl: PropTypes.string,
    participantsNicknames: PropTypes.array,
    participantsProfileImageUrls: PropTypes.object,
    recommendCount: PropTypes.number,
    commentCount: PropTypes.number,
    agreeCount: PropTypes.number,
    disagreeCount: PropTypes.number,
    category: PropTypes.string,
    createdAt: PropTypes.array,
    roomId: PropTypes.number,
    maxParticipantCount: PropTypes.number,
    moderatorNickname: PropTypes.string,
    userStatus: PropTypes.string,
  }),
};

Tile.defaultProps = {
  board: {
    title: '',
    roomName: '',
    content: '',
    selected: false,
    imageUrls: [null, null, null],
    nickname: '',
    profileImageUrl: '',
    participants: [],
    participantsProfileImageUrls: [],
    recommendCount: 0,
    agreeCount: 0,
    disagreeCount: 0,
    category: '',
    createdAt: [],
  },
};

const LiveTileWrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  padding: 20px 24px 20px 24px;
  width: 300px;
  height: 218px;
  overflow: hidden;
  transition: all 0.2s ease;

  &:active {
    background-color: ${({ theme }) => theme.colors.gray};
    //background-color: rgba(0, 0, 0, 0.1);
  }

  > .buttonGroup {
    position: absolute;
    bottom: 20px;
    justify-content: space-between;
  }
`;
const WarningJoinRoomBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.overlap};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BasicTileWrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px 24px 20px 24px;
  width: 300px;
  height: 218px;
  box-sizing: border-box;

  > .buttonGroup {
    position: absolute;
    bottom: 20px;
    box-sizing: border-box;
    justify-content: space-between;
  }
`;

export default Tile;
