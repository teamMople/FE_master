import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ChatUserProfile = ({ streamManager, isMute, userName }) => {
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
          <UserVideo autoPlay={true} ref={videoRef} />
          <UserImage
            src={'/asset/image/userIcon.jpeg'}
            style={{ width: 30, height: 30 }}
            alt={'profile-image'}
          />
          {isMute ? <div>음소거 X</div> : <div>음소거 O</div>}

          <div>{userName ? userName : null}</div>
        </UserWrapper>
      )}
    </>
  );
};

ChatUserProfile.propTypes = {
  streamManager: PropTypes.any,
  isMute: PropTypes.bool,
  userName: PropTypes.string,
};

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const UserVideo = styled.video`
  width: 0;
  height: 0;
`;
const UserImage = styled.img`
  border-radius: 10em;
  width: 30px;
  height: 30px;
`;

export default ChatUserProfile;
