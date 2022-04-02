import React, { useEffect } from 'react';
import { Wrapper, Grid, Text } from 'components';

const AuthorizationPermission = (props) => {
  return (
    <Wrapper>
      <Text>
        안전하고 편리한 Boilerplate 이용을 위해 다음 권한이 필요합니다.
      </Text>
      <Grid>
        <Grid>
          <Text bold medium>
            사진(필수)
          </Text>
          <Text small>프로필 사진 등록에 필요합니다.</Text>
        </Grid>
        <Grid>
          <Text bold medium>
            알림(필수)
          </Text>
          <Text small>댓글 알림에 필요합니다.</Text>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default AuthorizationPermission;
