import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Text, NotificationTile } from 'components';
import { useSelector } from 'react-redux';
import { selectedNotificationList } from 'modules/notifications';

function NotificationList(props) {
  const themeContext = useContext(ThemeContext);
  const notificationList = useSelector(selectedNotificationList);
  console.log(notificationList);

  useEffect(() => {}, []);

  return (
    <Wrapper
      backgroundColor={themeContext.colors.backgroundGray}
      padding="0px 24px 0px 24px"
    >
      <Grid width="100%" margin="0px 0px 16px 0px">
        <Text bold huge>
          알림
        </Text>
      </Grid>
      <Grid width="100%" height="100%">
        {notificationList.length === 0 && (
          <Grid width="100%" height="100%" center>
            <Text color={themeContext.colors.blue}>도착한 알람이 없어요</Text>
          </Grid>
        )}
        {notificationList.length !== 0 &&
          notificationList.map((noti, index) => {
            return (
              <NotificationTile
                key={index}
                board={noti.title}
                message={noti.body}
                createdAt={noti.createdAt}
              />
            );
          })}
      </Grid>
    </Wrapper>
  );
}

export default NotificationList;
