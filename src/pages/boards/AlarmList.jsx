import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Text, AlarmTile } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import apis from 'apis/apis';
import { selectedAlarmList } from 'modules/alarms';

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
  const alarmList = useSelector(selectedAlarmList);
  console.log(alarmList);

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
              <AlarmTile key={index} board={alarm.title} message={alarm.body} />
            );
          })}
      </Grid>
    </Wrapper>
  );
}

export default AlarmList;
