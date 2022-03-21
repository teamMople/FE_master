import React, { useContext } from 'react';
import { Grid, Text, Check } from 'components';
import { ThemeContext } from 'styled-components';

const Survey = (props) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Grid>
      <Grid isFlex margin="0px 0px 16px 0px">
        <Grid width="10%">
          <Check />
        </Grid>
        <Grid width="90%">
          <Text
            size="12px"
            lineHeight="18px"
            color={themeContext.colors.darkGray}
          >
            심한 욕설 또는 저속한 표현으로 이용자 다수에게 불쾌감을 주는 경우는
            이용이 제한될 수 있습니다.
          </Text>
          <Grid
            width="100%"
            height="1px"
            backgroundColor={themeContext.colors.lightGray}
            margin="10px 0px 0px 0px"
          />
        </Grid>
      </Grid>
      <Grid isFlex margin="0px 0px 16px 0px">
        <Grid width="10%">
          <Check />
        </Grid>
        <Grid width="90%">
          <Text
            size="12px"
            lineHeight="18px"
            color={themeContext.colors.darkGray}
          >
            타인의 신체, 외모, 취향 등에 대해 경멸의 의미를 담아 비하하는
            게시물은 제한될 수 있습니다.
          </Text>
          <Grid
            width="100%"
            height="1px"
            backgroundColor={themeContext.colors.lightGray}
            margin="10px 0px 0px 0px"
          />
        </Grid>
      </Grid>
      <Grid isFlex margin="0px 0px 16px 0px">
        <Grid width="10%">
          <Check />
        </Grid>
        <Grid width="90%">
          <Text
            size="12px"
            lineHeight="18px"
            color={themeContext.colors.darkGray}
          >
            특정 계층, 지역, 국민, 종교를 근거없이 비하하거나 비방하는 내용의
            게시물은 제한될 수 있습니다.
          </Text>
          <Grid
            width="100%"
            height="1px"
            backgroundColor={themeContext.colors.lightGray}
            margin="10px 0px 0px 0px"
          />
        </Grid>
      </Grid>
      <Grid isFlex margin="0px 0px 16px 0px">
        <Grid width="10%">
          <Check />
        </Grid>
        <Grid width="90%">
          <Text
            size="12px"
            lineHeight="18px"
            color={themeContext.colors.darkGray}
          >
            사회적 소수자를 근거 없이 비하하거나 비방하는 내용의 게시물은 제한될
            수 있습니다.
          </Text>
          <Grid
            width="100%"
            height="1px"
            backgroundColor={themeContext.colors.lightGray}
            margin="10px 0px 0px 0px"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Survey;
