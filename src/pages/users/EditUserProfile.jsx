import React, { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  BUCKET,
  awsS3Bucket,
  BASE_S3_URL,
} from '../../shared/utils/awsBucketConfig';
import apis from 'apis/apis';
import lo from 'lodash';

import styled, { ThemeContext } from 'styled-components';
import { Wrapper, Grid, Text, Image, Button, Input, Header } from 'components';
import { useDispatch } from 'react-redux';
import { editMyInfo } from 'modules/users';

function EditUserProfile(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  const prevNickname = localStorage.getItem('nickname');
  const prevProfileImageUrl = localStorage.getItem('profileImageUrl');

  // Nickname
  const [nickname, setNickname] = useState(prevNickname);
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState();

  const nicknameDebounce = lo.debounce((k) => setNickname(k), 1000);
  const nicknameKeyPress = useCallback(nicknameDebounce, []);

  const changeNickname = (e) => {
    nicknameKeyPress(e.target.value);
  };

  const checkDuplicateNickname = async () => {
    if (nickname === prevNickname) {
      setNicknameCheckMessage('이전과 동일한 닉네임입니다.');
    } else {
      const response = await apis.verifyNickname(nickname);
      if (response.data.message === 'true') {
        setNicknameCheckMessage('이미 존재하는 닉네임입니다');
      } else if (response.data.message === 'false') {
        setNicknameCheckMessage('사용하실 수 있습니다');
      } else {
        setNicknameCheckMessage();
      }
    }
  };

  // Image Uploader
  const [previewProfileImage, setPreviewProfileImage] =
    useState(prevProfileImageUrl);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(prevProfileImageUrl);

  const hiddenProfileImageInput = React.useRef(null);
  const handleProfileImageClick = (e) => {
    hiddenProfileImageInput.current.click();
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setPreviewProfileImage(result);
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

  // Submit
  async function submitUserInfoWithImageAsync(folderName, file) {
    const signedUrl = await handleUpload(folderName, file);
    setProfileImageUrl(signedUrl);
    const userInfo = { nickname, profileImageUrl: signedUrl };
    dispatch(editMyInfo(userInfo));
  }

  async function submitUserInfoWithoutImageAsync() {
    const userInfo = { nickname, profileImageUrl };
    dispatch(editMyInfo(userInfo));
  }

  return (
    <NewWrapper padding="0 24px">
      <Header label="프로필 편집" leftArrow />

      <Grid padding="32px 24px 0px 24px">
        <Grid center width="100%" margin="0px 0px 32px 0px">
          <Image
            shape="circle"
            size={134}
            src={previewProfileImage}
            onClick={handleProfileImageClick}
          />
          <input
            type="file"
            style={{ display: 'none' }}
            accept=".jpg,.jpeg,.png"
            ref={hiddenProfileImageInput}
            onChange={onImageChange}
          />
        </Grid>
        <Grid margin="0px 0px 16px 0px">
          <Input
            backgroundColor={themeContext.colors.white}
            color={themeContext.colors.black}
            width="100%"
            type="text"
            onChange={changeNickname}
            placeholder={prevNickname}
          />
        </Grid>
        <Grid isFlex padding="0px 17.5px 0px 17.5px">
          <Text size="10px" color={themeContext.colors.blue}>
            {nicknameCheckMessage}
          </Text>
          <Grid
            onClick={() => {
              checkDuplicateNickname(nickname);
            }}
          >
            <Text size="10px" color={themeContext.colors.blue}>
              중복확인
            </Text>
          </Grid>
        </Grid>
        <div
          style={{
            position: 'absolute',
            left: '0px',
            bottom: '71px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={(e) => {
              if (selectedFile) {
                submitUserInfoWithImageAsync('profile', selectedFile);
              } else {
                submitUserInfoWithoutImageAsync();
              }
            }}
            secondary
          >
            저장
          </Button>
        </div>
      </Grid>
    </NewWrapper>
  );
}

const NewWrapper = styled(Wrapper)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

export default EditUserProfile;
