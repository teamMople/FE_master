import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ThemeContext } from 'styled-components';
import { Grid, Text, Image, Button, ProfileImageStack } from 'components';

const Tile = (props) => {
  const { type, board } = props;
  const themeContext = useContext(ThemeContext);

  switch (type) {
    case 'live':
      return (
        <LiveTileWrapper>
          <Grid margin="0px 0px 18px 0px">
            <ProfileImageStack
              nicknames={board.participants}
              imageUrls={board.participantsProfileImageUrls}
            />
          </Grid>
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
                height={32}
                backgroundColor={themeContext.colors.lightGray}
              >
                <Grid margin="0px 5px 0px 0px">
                  <img src="/asset/icons/Join.svg" />
                </Grid>
                <Text>{board.recommendCount}</Text>
              </Button>
            </Grid>
            <Grid isFlex>
              <Grid margin="0px 8px 0px 0px">
                <Button
                  width="58px"
                  height={32}
                  backgroundColor={themeContext.colors.lightGray}
                >
                  <Grid margin="0px 5px 0px 0px">
                    <img src="/asset/icons/Agreed.svg" />
                  </Grid>
                  <Text>{board.agreeCount}</Text>
                </Button>
              </Grid>
              <Grid>
                <Button
                  width="58px"
                  height={32}
                  backgroundColor={themeContext.colors.lightGray}
                >
                  <Grid margin="0px 5px 0px 0px">
                    <img src="/asset/icons/Disagreed.svg" />
                  </Grid>
                  <Text>{board.disagreeCount}</Text>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </LiveTileWrapper>
      );
    case 'basic':
      return (
        <BasicTileWrapper>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '18px',
            }}
          >
            <Image shape="circle" size={32} src={board.authorProfileImageUrl} />
            <Grid margin="0px 0px 0px 8px">
              <Text
                bold
                size="12px"
                lineHeight="18px"
                color={themeContext.colors.black}
              >
                {board.authorNickname}
              </Text>
              <Text
                size="10px"
                lineHeight="18px"
                color={themeContext.colors.gray}
              >
                3일전
              </Text>
            </Grid>
          </div>
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
                height={32}
                backgroundColor={themeContext.colors.lightGray}
              >
                <Grid margin="0px 5px 0px 0px">
                  <img src="/asset/icons/Vote.svg" />
                </Grid>
                <Text>{board.recommendCount}</Text>
              </Button>
            </Grid>
            <Grid isFlex>
              <Grid margin="0px 8px 0px 0px">
                <Button
                  width="58px"
                  height={32}
                  backgroundColor={themeContext.colors.lightGray}
                >
                  <Grid margin="0px 5px 0px 0px">
                    <img src="/asset/icons/Agreed.svg" />
                  </Grid>
                  <Text>{board.agreeCount}</Text>
                </Button>
              </Grid>
              <Grid>
                <Button
                  width="58px"
                  height={32}
                  backgroundColor={themeContext.colors.lightGray}
                >
                  <Grid margin="0px 5px 0px 0px">
                    <img src="/asset/icons/Disagreed.svg" />
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
    title: PropTypes.string,
    content: PropTypes.string,
    selected: PropTypes.bool,
    imageUrls: PropTypes.array,
    authorNickname: PropTypes.string,
    authorProfileImageUrl: PropTypes.string,
    participants: PropTypes.array,
    participantsProfileImageUrls: PropTypes.array,
    recommendCount: PropTypes.number,
    agreeCount: PropTypes.number,
    disagreeCount: PropTypes.number,
  }),
};

Tile.defaultProps = {
  board: {
    title: '',
    content: '',
    selected: false,
    imageUrls: [null, null, null],
    authorNickname: '',
    authorProfileImageUrl: '',
    participants: [],
    participantsProfileImageUrls: [],
    recommendCount: 0,
    agreeCount: 0,
    disagreeCount: 0,
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
