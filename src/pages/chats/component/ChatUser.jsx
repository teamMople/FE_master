import React, { useContext, useEffect, useRef } from 'react';
import styled, { ThemeContext, keyframes } from 'styled-components';
import { Text } from 'components';
import PropTypes from 'prop-types';

const ChatUser = ({
  streamManager,
  isMute,
  memberName,
  detectSpeaking,
  moderator,
  myHandsUpState,
  profileImageUrl,
}) => {
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
            <UserImage
              src={
                profileImageUrl
                  ? profileImageUrl
                  : '/asset/image/users/test.png'
              }
              alt="user"
              style={{
                outline: detectSpeaking
                  ? `1.5px solid ${themeContext.colors.blue}`
                  : 'none',
                transition: detectSpeaking && 'all 0.2s ease',
              }}
            />
            {myHandsUpState ? (
              <HandIcon>
                <img
                  src={'/asset/icons/raisehand_active_mini.svg'}
                  alt="icon"
                />
              </HandIcon>
            ) : !myHandsUpState && isMute ? (
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
            {memberName ? memberName : 'null'}
            {moderator === memberName && '(방장)'}
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
  detectSpeaking: PropTypes.any,
  moderator: PropTypes.string,
  myHandsUpState: PropTypes.bool,
  profileImageUrl: PropTypes.string,
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
  min-width: 75px;
  min-height: 75px;
  max-width: 75px;
  max-height: 75px;
  overflow: hidden;
  border-radius: 10em;
  outline-offset: 5px;
  box-sizing: border-box;
  object-fit: cover;
`;
const MicIcon = styled.div`
  position: absolute;
  right: 0;
  bottom: -8px;
`;

const shakeHand = keyframes`
  0%{
    //transform: rotate(-30deg);
    transform: scale(1);
  }
  100%{
    //transform: rotate(30deg);
    transform: scale(1.2);
  }
`;
const HandIcon = styled.div`
  position: absolute;
  right: 0;
  bottom: -8px;
  animation-name: ${shakeHand};
  animation-duration: 0.3s;
  //animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

export default ChatUser;
