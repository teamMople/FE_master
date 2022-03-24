import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ThemeContext } from 'styled-components';
import { Grid, Text, Button, ProfileImageStack, ProfileBox } from 'components';
import { useNavigate } from 'react-router-dom';
import StatusBox from './StatusBox';

const Tile = (props) => {
  const { type, board } = props;
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  switch (type) {
    case 'live':
      return (
        <LiveTileWrapper>
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
              {board.roomName}
            </Text>
          </Grid>
          <Grid height={40}>
            <Text
              color={themeContext.colors.darkGray}
              size="12px"
              lineHeight="20px"
            >
              {board.content && board.content.length > 51
                ? board.content.slice(0, 51) + '...'
                : board.content}
            </Text>
          </Grid>
          <Grid isFlex width="252px" className="buttonGroup">
            <Grid isFlex>
              <StatusBox
                icon={'/asset/icons/Join.svg'}
                count={board.participantsNicknames.length}
              />
            </Grid>
            <Grid isFlex>
              <Grid margin="0px 8px 0px 0px">
                <StatusBox
                  icon={'/asset/icons/Agreed.svg'}
                  count={board.agreeCount}
                />
              </Grid>
              <Grid>
                <StatusBox
                  icon={'/asset/icons/Disagreed.svg'}
                  count={board.disagreeCount}
                />
              </Grid>
            </Grid>
          </Grid>
        </LiveTileWrapper>
      );
    case 'basic':
      return (
        <BasicTileWrapper
          onClick={() => {
            navigate('/board/' + board.id);
          }}
        >
          <ProfileBox
            profileImageUrl={board.profileImageUrl}
            nickname={board.nickname}
            createdAt={board.createdAt}
            margin="0px 0px 18px 0px"
          />
          <Grid margin="0px 0px 14px 0px">
            <Text
              bold
              color={themeContext.colors.black}
              size="14px"
              lineHeight="18px"
            >
              {board.title}
            </Text>
          </Grid>
          <Grid height={40}>
            <Text
              color={themeContext.colors.darkGray}
              size="12px"
              lineHeight="20px"
            >
              {board.content}
            </Text>
          </Grid>
          <Grid isFlex width="252px" className="buttonGroup">
            <Grid isFlex>
              <Button
                width="58px"
                height="32px"
                backgroundColor={themeContext.colors.lightGray}
                onClick={() => {}}
              >
                <Grid margin="0px 5px 0px 0px">
                  <img src="/asset/icons/Vote.svg" alt="vote icon" />
                </Grid>
                <Text>{board.recommendCount}</Text>
              </Button>
            </Grid>
            <Grid isFlex>
              <Grid margin="0px 8px 0px 0px">
                <Button
                  width="54px"
                  height="32px"
                  backgroundColor={themeContext.colors.lightGray}
                >
                  <Grid margin="0px 5px 0px 0px">
                    <img src="/asset/icons/Agreed.svg" alt="agree icon" />
                  </Grid>
                  <Text>{board.agreeCount}</Text>
                </Button>
              </Grid>
              <Grid>
                <Button
                  width="54px"
                  height="32px"
                  backgroundColor={themeContext.colors.lightGray}
                >
                  <Grid margin="0px 5px 0px 0px">
                    <img src="/asset/icons/Disagreed.svg" alt="disagree icon" />
                  </Grid>
                  <Text>{board.disagreeCount}</Text>
                </Button>
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
    agreeCount: PropTypes.number,
    disagreeCount: PropTypes.number,
    category: PropTypes.string,
    createdAt: PropTypes.array,
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

  > .buttonGroup {
    position: absolute;
    bottom: 20px;
    justify-content: space-between;
  }
`;

const BasicTileWrapper = styled.div`
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px 24px 20px 24px;
  width: 300px;
  height: 218px;

  > .buttonGroup {
    position: absolute;
    bottom: 20px;
    justify-content: space-between;
  }
`;

const CategoryTileWrapper = styled.div``;

export default Tile;
