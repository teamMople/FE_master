import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Input, Header } from 'components';

function CreateBoard(props) {
  const themeContext = useContext(ThemeContext);

  return (
    <Wrapper padding="42px 0px 0px 0px">
      <Grid padding="0px 24px 0px 24px">
        <Header label="게시글 작성" leftArrow />
      </Grid>
      <Grid>카테고리 선택창 넣을 자리</Grid>
      <Grid>
        <Input
          bold
          width="100%"
          placeholder="제목을 입력해주세요"
          style={{ border: 'none', borderRadius: '0px' }}
        />
      </Grid>
      <Grid
        width="100%"
        height="1px"
        backgroundColor={themeContext.colors.gray}
      />
      <Grid>textarea 넣을 자리</Grid>
      <Grid>
        <img src="/asset/icons/Image.svg" />
      </Grid>
    </Wrapper>
  );
}

export default CreateBoard;
