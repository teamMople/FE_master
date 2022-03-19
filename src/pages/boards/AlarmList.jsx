import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Wrapper, Grid, AlarmTile } from 'components';

const alarms = [
  { author: '짜짜로니요리사', message: '새로운 댓글을 등록하였습니다.' },
  { author: '짜왕요리사', message: '라이브 토론방에 입장하였습니다.' },
];

function AlarmList(props) {
  const themeContext = useContext(ThemeContext);
  console.log(alarms);
  return (
    <Wrapper
      backgroundColor={themeContext.colors.backgroundGray}
      padding="93px 24px 0px 24px"
    >
      <Grid>
        {alarms.map((alarm, index) => {
          return (
            <AlarmTile
              key={index}
              author={alarm.author}
              message={alarm.message}
            />
          );
        })}
      </Grid>
    </Wrapper>
  );
}

export default AlarmList;
