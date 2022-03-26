import React, { useContext, useEffect, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Text } from 'components';
import PropTypes from 'prop-types';

const ChatUser = ({ streamManager, isMute, memberName }) => {
  const themeContext = useContext(ThemeContext);
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);
  return (
    <>
      {streamManager && (
        <UserWrapper>
          <ImageWrapper>
            <UserVideo autoPlay={true} ref={videoRef} />
            <UserImage src={'/asset/image/users/test.png'} alt="user" />

            {isMute ? (
              <MicIcon>
                <img src={'/asset/icons/microphone_active.svg'} alt="user" />
              </MicIcon>
            ) : (
              <MicIcon>
                <img src={'/asset/icons/microphone.svg'} alt="user" />
              </MicIcon>
            )}
          </ImageWrapper>
          <Text small center color={themeContext.colors.gray2}>
            {memberName ? memberName : 'null'}(방장)
          </Text>
        </UserWrapper>
      )}
    </>
  );
};

ChatUser.propTypes = {
  streamManager: PropTypes.any,
  isMute: PropTypes.bool,
  memberName: PropTypes.string,
  onClickSendForceMuteBool: PropTypes.bool,
  onClickSendForceMute: PropTypes.func,
};
const UserVideo = styled.video`
  width: 0;
  height: 0;
`;
const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100px;
`;
const ImageWrapper = styled.div`
  width: 75px;
  height: 75px;
  position: relative;
  margin-bottom: 11px;
`;
const UserImage = styled.img`
  width: 75px;
  height: 75px;
  overflow: hidden;
  border-radius: 10em;
  outline-offset: 5px;
  outline: 1.5px solid ${({ theme }) => theme.colors.blue};
  box-sizing: border-box;
`;
const MicIcon = styled.div`
  position: absolute;
  right: 0;
  bottom: -8px;
`;

export default ChatUser;
