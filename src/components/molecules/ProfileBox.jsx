import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Grid, Image, Text } from 'components';

const getDateString = (dateArray) => {
  if (dateArray) {
    const now = new Date();
    const nowTime = parseInt(now.getTime()) / 1000;
    let regDt = new Date(
      Date.UTC(
        dateArray[0],
        dateArray[1] - 1,
        dateArray[2],
        dateArray[3],
        dateArray[4],
        dateArray[5],
      ),
    );
    const regDtTime = parseInt(regDt.getTime()) / 1000;
    const result = (nowTime - regDtTime) / 3600;

    if (result > 24) {
      return parseInt(result / 24) + '일 전';
    } else if (result < 1) {
      return parseInt(result * 60) + '분 전';
    } else {
      return parseInt(result) + '시간 전';
    }
  } else {
    return;
  }
};

const ProfileBox = (props) => {
  const themeContext = useContext(ThemeContext);
  return (
    <ProfileWrapper {...props}>
      <Image shape="circle" size={32} src={props.profileImageUrl} />
      <Grid margin="0px 0px 0px 8px">
        <Text
          bold
          size="12px"
          lineHeight="18px"
          color={themeContext.colors.black}
        >
          {props.nickname}
        </Text>
        <Text
          size="10px"
          lineHeight="18px"
          color={themeContext.colors.placeholder}
        >
          {getDateString(props.createdAt)}
        </Text>
      </Grid>
    </ProfileWrapper>
  );
};

ProfileBox.propTypes = {
  profileImageUrl: PropTypes.string,
  nickname: PropTypes.string,
  createdAt: PropTypes.array,
};

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;

export default ProfileBox;
