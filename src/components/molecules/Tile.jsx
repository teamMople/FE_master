import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ThemeContext } from 'styled-components';
import { Text, Image } from '../atoms';
import { ProfileImageStack } from '../molecules';

const Tile = (props) => {
  const { type, board } = props;
  const themeContext = useContext(ThemeContext);

  switch (type) {
    case 'live':
      return (
        <LiveTileWrapper>
          <ProfileImageStack
            nicknames={board.participants}
            imageUrls={board.participantsProfileImageUrls}
          />
          <Text bold color="#fff" size="14px">
            {board.title}
          </Text>
          <div
            style={{
              margin: '0px 0px 0px 0px',
              width: '220.62px',
              height: '40.58px',
              boxSizing: 'border-box',
              overflowY: 'hidden',
              marginBottom: '15.35px',
            }}
          >
            <Text color="#fff" size="12px">
              {board.content}
            </Text>
          </div>
          <div id="buttonGroup">
            <div id="buttonSubGroup">
              <div id="button">
                <img src="/asset/icons/Recommend.svg" />
                {board.recommendCount}
              </div>
            </div>
            <div id="buttonSubGroup">
              <div id="button" style={{ marginRight: '8px' }}>
                <img src="/asset/icons/Agreed.svg" />
                {board.agreeCount}
              </div>
              <div id="button">
                <img src="/asset/icons/Disagreed.svg" />
                {board.disagreeCount}
              </div>
            </div>
          </div>
        </LiveTileWrapper>
      );
    case 'basic':
      return (
        <BasicTileWrapper>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Image shape="circle" size={32} src={board.authorProfileImageUrl} />
            <div style={{ marginLeft: '8px' }}>
              <Text bold size="12px">
                {board.authorNickname}
              </Text>
            </div>
          </div>
          <Text bold size="14px">
            {board.title}
          </Text>
          <div
            style={{
              margin: '0px 0px 0px 0px',
              width: '220.62px',
              height: '40.58px',
              boxSizing: 'border-box',
              overflowY: 'hidden',
              marginBottom: '15.35px',
            }}
          >
            <Text color="4F4F4F" size="12px">
              {board.content}
            </Text>
          </div>
          <div id="buttonGroup">
            <div id="buttonSubGroup">
              <div id="button">
                <img src="/asset/icons/Recommend.svg" />
                {board.recommendCount}
              </div>
            </div>
            <div id="buttonSubGroup">
              <div id="button" style={{ marginRight: '8px' }}>
                <img src="/asset/icons/Agreed.svg" />
                {board.agreeCount}
              </div>
              <div id="button">
                <img src="/asset/icons/Disagreed.svg" />
                {board.disagreeCount}
              </div>
            </div>
          </div>
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
  background-color: #6e6bf0;
  border-radius: 20px;
  padding: 20px 24px 20px 24px;
  width: 300px;
  height: 218px;

  #buttonGroup {
    display: flex;
    justify-content: space-between;
  }

  #buttonSubGroup {
    display: flex;
    justify-content: space-between;
  }

  #button {
    border-radius: 30px;
    padding: 0px 6.67px 0px 9px;
    width: 52px;
    height: 32px;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const BasicTileWrapper = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px 24px 20px 24px;
  width: 300px;
  height: 218px;

  #buttonGroup {
    display: flex;
    justify-content: space-between;
  }

  #buttonSubGroup {
    display: flex;
    justify-content: space-between;
  }

  #button {
    border-radius: 30px;
    padding: 0px 6.67px 0px 9px;
    width: 52px;
    height: 32px;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const CategoryTileWrapper = styled.div``;

export default Tile;
