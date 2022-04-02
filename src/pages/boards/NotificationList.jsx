import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Text, NotificationTile } from 'components';
import { useSelector } from 'react-redux';
import { selectedAlarmList } from 'modules/alarms';

function NotificationList(props) {
  const themeContext = useContext(ThemeContext);
  const notificationList = useSelector(selectedAlarmList);

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
        {!notificationList && <Grid>도착한 알람이 없어요</Grid>}
        {notificationList &&
          notificationList.map((alarm, index) => {
            return (
              <NotificationTile
                key={index}
                board={alarm.title}
                message={alarm.body}
              />
            );
          })}
      </Grid>
    </Wrapper>
  );
}

export default NotificationList;
