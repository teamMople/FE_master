import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Text, AlarmTile } from 'components';
import { useDispatch } from 'react-redux';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import apis from 'apis/apis';

const alarms = [
  {
    board: '민초 vs 반민초',
    message: '글에 새로운 댓글이 달렸습니다',
  },
  {
    board: '민초 vs 반민초',
    message: '의 투표가 진행 중입니다.진행 상황을 확인해보세요!',
  },
  {
    board: '제목의 길이가 길어지면 어디서...',
    message: '라이브가 시작되었습니다.',
  },
];

function AlarmList(props) {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();

  const [alarmList, setAlarmList] = useState(alarms);

  // FCM
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
    setAlarmList(payload);
  });

  useEffect(() => {}, []);

  return (
    <Wrapper
      backgroundColor={themeContext.colors.backgroundGray}
      padding="93px 24px 0px 24px"
    >
      <Grid width="100%" margin="0px 0px 16px 0px">
        <Text bold huge>
          알림
        </Text>
      </Grid>
      <Grid>
        {!alarmList && <Grid>도착한 알람이 없어요</Grid>}
        {alarmList &&
          alarmList.map((alarm, index) => {
            return (
              <AlarmTile
                key={index}
                board={alarm.board}
                message={alarm.message}
              />
            );
          })}
      </Grid>
    </Wrapper>
  );
}

export default AlarmList;
