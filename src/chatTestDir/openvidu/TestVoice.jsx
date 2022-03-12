import React from 'react';
import { OpenVidu } from 'openvidu-browser';
import { useState } from 'react';
import axios from 'axios';
import UserVideoComponent from './UserVideoComponent';

// const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_URL = 'http://localhost:8080';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

const TestVoice = () => {
  const [mySessionId, setMySessionId] = useState('SessionA');
  const [myUserName, setMyUserName] = useState(
    'Participant' + Math.floor(Math.random() * 100),
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);

  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  };
  const handleChangeUserName = (e) => {
    setMyUserName(e.target.value);
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager) => {
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers(subscribers);
    }
  };

  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---
    let OV = new OpenVidu();

    // --- 2) Init a session ---

    setSession(OV.initSession());
    let mySession = session;
    // --- 3) Specify the actions when events take place in the session ---
    // On every new Stream received...
    if (mySession) {
      console.log('mySession : ', mySession);
      mySession.on('streamCreated', (event) => {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        let subscriber = mySession.subscribe(event.stream.undefined);

        // Update the state with the new subscribers
        setSubscribers([...subscribers, subscriber]);
      });

      mySession.on('streamDestroyed', (event) => {
        deleteSubscriber(event.stream.streamManager);
      });
      mySession.on('exception', (exception) => {
        console.warn(exception);
      });
    }

    getToken().then((token) => {
      if (mySession) {
        mySession
          .connect(token, { clientData: myUserName })
          .then(async () => {
            let devices = await OV.getDevices();
            let videoDevices = devices.filter(
              (device) => device.kind === 'videoinput',
            );

            let publisher = OV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: '640x480', // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });

            mySession.publish(publisher);

            setCurrentVideoDevice(videoDevices[0]);
            setMainStreamManager(publisher);
            setPublisher(publisher);
          })
          .catch((error) =>
            console.log(
              'There was an error connecting to the session:',
              error.code,
              error.message,
            ),
          );
      }
    });
  };

  const getToken = async () => {
    const data = {
      roomId: 132156132153613,
      memberName: 'DONGSEOB',
      role: 'MODERATOR',
    };
    await axios
      .post(`${OPENVIDU_SERVER_URL}/api/audio/join`, data)
      .then((res) => {
        console.log(res);
        console.log('😽성공 여부 ==>', res.data.etc);
        return res.data.token;
      })
      .catch((err) => console.log(err));
  };

  // const getToken = () => {
  //   return createSession(mySessionId).then((sessionId) =>
  //     createToken(sessionId),
  //   );
  // };

  // const createSession = (sessionId) => {
  //   return new Promise((resolve, reject) => {
  //     let data = JSON.stringify({ customSessionId: sessionId });
  //     axios
  //       .post(OPENVIDU_SERVER_URL + '/api/audio/join', data, {
  //         headers: {
  //           Authorization:
  //             'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //       .then((response) => {
  //         console.log('CREATE SESION', response);
  //         resolve(response.data.id);
  //       })
  //       .catch((response) => {
  //         let error = Object.assign({}, response);
  //         if (error?.response?.status === 409) {
  //           resolve(sessionId);
  //         } else {
  //           console.log(error);
  //           console.warn(
  //             'No connection to OpenVidu Server. This may be a certificate error at ' +
  //               OPENVIDU_SERVER_URL,
  //           );
  //           if (
  //             window.confirm(
  //               'No connection to OpenVidu Server. This may be a certificate error at "' +
  //                 OPENVIDU_SERVER_URL +
  //                 '"\n\nClick OK to navigate and accept it. ' +
  //                 'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
  //                 OPENVIDU_SERVER_URL +
  //                 '"',
  //             )
  //           ) {
  //             window.location.assign(
  //               OPENVIDU_SERVER_URL + '/accept-certificate',
  //             );
  //           }
  //         }
  //       });
  //   });
  // };
  //
  // const createToken = async (sessionId) => {
  //   let data = {};
  //   await axios
  //     .post(
  //       OPENVIDU_SERVER_URL +
  //         '/openvidu/api/sessions/' +
  //         sessionId +
  //         '/connection',
  //       data,
  //       {
  //         headers: {
  //           Authorization:
  //             'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     )
  //     .then((response) => {
  //       console.log('TOKEN', response);
  //       return response.data.token;
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div className="container">
      {session === undefined ? (
        <div id="join">
          <div id="img-div">
            <img
              src="resources/images/openvidu_grey_bg_transp_cropped.png"
              alt="OpenVidu logo"
            />
          </div>
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input
                  className="btn btn-lg btn-success"
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
              </p>
            </form>
          </div>
        </div>
      ) : null}

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              // onClick={leaveSession}
              value="Leave session"
            />
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
              <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                // onClick={switchCamera}
                value="Switch Camera"
              />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={i}
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(sub)}
              >
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TestVoice;
