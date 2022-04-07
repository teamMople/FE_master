import React, { useContext, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  BUCKET,
  awsS3Bucket,
  BASE_S3_URL,
} from '../../shared/utils/awsBucketConfig';
import { createBoardAsync } from 'modules/boards';

import styled, { ThemeContext } from 'styled-components';
import {
  Wrapper,
  Grid,
  Input,
  Image,
  Header,
  Textarea,
  DropdownSelect,
  Text,
} from 'components';

function CreateBoard(props) {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();

  // Select
  const options = [
    { value: '학교생활', label: '학교생활' },
    { value: '직장생활', label: '직장생활' },
    { value: '관계/심리', label: '관계/심리' },
    { value: '시사/이슈', label: '시사/이슈' },
    { value: '일상생활', label: '일상생활' },
    { value: '기타', label: '기타' },
  ];

  // Input
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [textLength, setTextLength] = useState(0);

  const changeCategory = (optionSelected) => {
    setCategory(optionSelected.value);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeContent = (e) => {
    const value = e.target.value;
    if (value.length < 300) {
      setTextLength(value.length);
      setContent(value);
    }
  };

  const textareaRef = useRef();
  const handleAutoResize = useCallback(() => {
    textareaRef.current.style.height = '18px';
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + 'px';
    return scrollHeight;
  }, []);

  // Image Loader
  const [previewImage, setPreviewImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const hiddenImageInput = React.useRef(null);
  const handleImageClick = () => {
    hiddenImageInput.current.click();
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setPreviewImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (folderName, file) => {
    const urlIdentifier = `img-${Math.ceil(Math.random() * 10 ** 10)}`;

    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: BUCKET,
      Key: folderName + '/' + urlIdentifier,
    };

    return new Promise((resolve, reject) => {
      awsS3Bucket.putObject(params).send((response) => {
        const signedUrl = BASE_S3_URL + folderName + '/' + urlIdentifier;
        resolve(signedUrl);
      });
    });
  };

  // submit
  const submitBoardWithImageAsync = async (folderName, file) => {
    const signedUrl = await handleUpload(folderName, file);
    const boardInfo = { title, content, imageUrl: signedUrl, category };
    dispatch(createBoardAsync(boardInfo));
  };

  const submitBoardWithOutImageAsync = () => {
    const boardInfo = { title, content, imageUrl, category };
    dispatch(createBoardAsync(boardInfo));
  };

  return (
    <NewWrapper>
      <Grid padding="0px 24px 12px 24px">
        <Header
          label="게시글 작성"
          leftArrow
          disabled={category === '' || title === '' || content === ''}
          rightButtonRender={{
            label: '완료',
            onClickButton: (e) => {
              if (selectedFile) {
                submitBoardWithImageAsync('image', selectedFile);
              } else {
                submitBoardWithOutImageAsync();
              }
            },
          }}
        />
      </Grid>
      <DropdownSelect
        placeholder="카테고리를 선택해주세요"
        options={options}
        color={themeContext.colors.lightGray}
        onChange={changeCategory}
      />

      <Grid padding="0px 24px 0px 24px">
        <Input
          bold
          type="text"
          width="100%"
          placeholder="제목을 입력해주세요"
          style={{
            border: 'none',
            borderRadius: 0,
            padding: 0,
            fontSize: '16px',
            borderBottom: `1px solid ${themeContext.colors.lightGray}`,
          }}
          onChange={changeTitle}
          margin="0"
        />
      </Grid>
      <Grid padding="16px 24px 0px 24px">
        <Textarea
          fluid
          type="text"
          border="none"
          height="200px"
          placeholder="토론하고 싶은 내용을 작성해주세요"
          onChange={changeContent}
          lineHeight="18px"
          value={content}
        />
        <Grid margin="0px 0px 8px 0px">
          <Text tiny right color={themeContext.colors.darkGray}>
            {textLength} / 300
          </Text>
        </Grid>
        {/* <textarea
          ref={textareaRef}
          autoFocus
          placeholder="댓글을 입력하세요"
          onChange={changeContent}
          onInput={handleAutoResize}
          style={{
            width: '100%',
            maxHeight: '200px',
            height: '30px',
            border: 'none',
            resize: 'none',
            overflowX: 'auto',
            fontSize: '14px',
            lineHeight: '18px',
            overflowY: 'hidden',
          }}
        /> */}
        {previewImage && (
          <ImageWrapper>
            <Grid
              right
              onClick={() => {
                setPreviewImage();
                setSelectedFile();
              }}
            >
              <img src={'/asset/icons/Close_no_shadow.svg'} />
            </Grid>
            <Image src={previewImage} shape={'rectangle'} />
          </ImageWrapper>
        )}
      </Grid>
      <Grid
        padding="16px 24px 0px 24px"
        style={{
          display: 'flex',
          position: 'fixed',
          bottom: '30px',
        }}
      >
        <Grid onClick={handleImageClick}>
          <img src="/asset/icons/Image.svg" alt="image" />
          <input
            type="file"
            style={{ display: 'none' }}
            accept=".jpg,.jpeg,.png,.gif"
            ref={hiddenImageInput}
            onChange={onImageChange}
          />
        </Grid>
      </Grid>
    </NewWrapper>
  );
}

const NewWrapper = styled(Wrapper)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ImageWrapper = styled.div``;

export default CreateBoard;
