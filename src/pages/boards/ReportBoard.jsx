import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Text, Header } from 'components';
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

const ReportBoard = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  return (
    <Wrapper backgroundColor={themeContext.colors.white}>
      <Header
        label="신고하기"
        leftArrow
        leftArrowOnClick={() => {
          navigate(-1);
        }}
      />
      <Grid>
        <Text>신고사유 선택</Text>
        <Grid>
          {reportItems.map((item, index) => {
            return (
              <Grid key={index} isSide>
                <Grid></Grid>
                <Grid>
                  <Text>{item}</Text>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default ReportBoard;
