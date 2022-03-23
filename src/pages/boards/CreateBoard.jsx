import React, { useContext, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { createBoardAsync } from 'modules/boards';
import { useNavigate } from 'react-router-dom';

function CreateBoard(props) {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = [
    { value: '학교생활', label: '학교생활' },
    { value: '직장생활', label: '직장생활' },
    { value: '관계/심리', label: '관계/심리' },
    { value: '시사/이슈', label: '시사/이슈' },
    { value: '일상생활', label: '일상생활' },
    { value: '기타', label: '기타' },
  ];

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const changeCategory = (optionSelected) => {
    setCategory(optionSelected.value);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const imageUrl =
    'https://media.bunjang.co.kr/product/176548894_1_1642591546_w360.jpg';
  const boardInfo = { title, content, imageUrl, category };

  return (
    <Wrapper padding="42px 0px 0px 0px">
      <Grid padding="0px 24px 12px 24px">
        <Header
          label="게시글 작성"
          leftArrow
          rightButton
          rightButtonChildren="완료"
          rightButtonOnClick={() => {
            dispatch(createBoardAsync(boardInfo));
            navigate('/home');
          }}
        />
      </Grid>
      <DropdownSelect
        placeholder="카테고리를 선택해주세요"
        options={options}
        closeMenuOnSelect={false}
        color={themeContext.colors.lightGray}
        onChange={changeCategory}
      />

      <Grid padding="0px 24px 0px 24px">
        <Input
          bold
          width="100%"
          placeholder="제목을 입력해주세요"
          style={{ border: 'none', borderRadius: '0px' }}
          onChange={changeTitle}
          padding="12px 0px 12px 0px"
        />
      </Grid>
      <Grid
        width="100%"
        height="1px"
        backgroundColor={themeContext.colors.gray}
      />
      <Grid padding="14px 24px 0px 24px">
        <Textarea
          fluid
          border="none"
          height="200px"
          placeholder="토론하고 싶은 내용을 작성해주세요"
          onChange={changeContent}
          fontSize="12px"
          lineHeight="18px"
          padding="8px 0px 8px 0px"
        />
      </Grid>
      <Grid padding="16px 24px 89px 24px">
        <img src="/asset/icons/Image.svg" />
      </Grid>
    </Wrapper>
  );
}

export default CreateBoard;
