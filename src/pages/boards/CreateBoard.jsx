import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Wrapper,
  Grid,
  Input,
  Header,
  Textarea,
  SelectTab,
  DropdownSelect,
} from 'components';

function CreateBoard(props) {
  const themeContext = useContext(ThemeContext);
  const options = [
    { value: '학교생활', label: '학교생활' },
    { value: '직장생활', label: '직장생활' },
    { value: '관계/심리', label: '관계/심리' },
    { value: '시사/이슈', label: '시사/이슈' },
    { value: '일상생활', label: '일상생활' },
    { value: '기타', label: '기타' },
  ];

  return (
    <Wrapper padding="42px 0px 0px 0px">
      <Grid padding="0px 24px 12px 24px">
        <Header label="게시글 작성" leftArrow />
      </Grid>
      <DropdownSelect placeholder="카테고리를 선택해주세요" options={options} />
      <Grid>
        <Input
          bold
          width="100%"
          placeholder="제목을 입력해주세요"
          padding="12px 24px 12px 24px"
          style={{ border: 'none', borderRadius: '0px' }}
        />
      </Grid>
      <Grid
        width="100%"
        height="1px"
        backgroundColor={themeContext.colors.gray}
      />
      <Grid>
        <Textarea
          fluid
          border="none"
          height="200px"
          padding="12px 24px 0px 24px"
          lineHeight="22px"
          placeholder="토론하고 싶은 내용을 작성해주세요"
        />
      </Grid>
      <Grid padding="16px 24px 89px 24px">
        <img src="/asset/icons/Image.svg" />
      </Grid>
    </Wrapper>
  );
}

export default CreateBoard;
