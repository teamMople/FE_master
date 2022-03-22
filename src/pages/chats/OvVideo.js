import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const OpenViduVideoComponent = ({ streamManager }) => {
  // console.log('🐤 streamManager', streamManager);
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <>
      {streamManager && (
        <>
          {/*{streamManager.stream.connection.connectionId}*/}
          <video
            autoPlay={true}
            ref={videoRef}
            style={{ width: 200, height: 200 }}
          />
        </>
      )}
    </>
  );
};

OpenViduVideoComponent.propTypes = {
  streamManager: PropTypes.any,
};

export default OpenViduVideoComponent;
