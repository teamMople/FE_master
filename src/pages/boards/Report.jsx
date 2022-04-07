import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Text, Button, Header, Survey } from 'components';
import { useNavigate, useParams } from 'react-router-dom';

const reportItems = [
  '욕설, 비방, 차별, 혐오',
  '홍보, 영리목적',
  '불법 정보',
  '음란, 청소년 유해',
  '개인 정보 노출, 유포, 거래',
  '도배, 스팸',
  '기타',
];

const Report = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  const [checkList, setCheckList] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const handleCheckClick = (index) => {
    setCheckList((checks) => checks.map((c, i) => (i === index ? !c : c)));
  };

  return (
    <Wrapper
      full
      backgroundColor={themeContext.colors.white}
      padding="56px 24px 0px 24px"
    >
      <Header
        label="신고하기"
        leftArrow
        leftArrowOnClick={() => {
          navigate(-1);
        }}
      />
      <Grid>
        <Grid width="100%" padding="24px 0px 23px 0px">
          <Text bold color={themeContext.colors.darkGray}>
            신고사유 선택
          </Text>
        </Grid>
        <Grid width="100%">
          {reportItems.map((item, index) => {
            return (
              <Survey
                key={index}
                label={item}
                onClick={() => handleCheckClick(index)}
                checked={checkList[index]}
              />
            );
          })}
        </Grid>
        <Grid center>
          <Grid margin="0px 0px 22px 0px">
            <Text tiny color={themeContext.colors.gray2}>
              허위신고일 경우, 신고자의 서비스 활동이 제한될 수 있으니
              유의하시어 신중하게 신고해주세요.
            </Text>
          </Grid>
          <Button
            secondary
            onClick={() => {
              navigate(-1);
            }}
          >
            확인
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Report;
