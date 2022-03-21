import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BUCKET,
  awsS3Bucket,
  BASE_S3_URL,
} from '../../shared/utils/awsBucketConfig';

import { ThemeContext } from 'styled-components';
import {
  Wrapper,
  Grid,
  Text,
  Image,
  Button,
  Input,
  Header,
  ProgressStepper,
  Check,
  Survey,
} from 'components';
import { useDispatch } from 'react-redux';

function EditUserProfile(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('noname');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [previewProfileImage, setPreviewProfileImage] = useState(
    'http://localhost:3001/asset/icons/Image.svg',
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  const userInfo = { email, profileImageUrl, nickname, password };

  useEffect(() => {
    setStep(0);
  }, []);

  const hiddenProfileImageInput = React.useRef(null);
  const handleProfileImageClick = (e) => {
    hiddenProfileImageInput.current.click();
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const changeNickname = (e) => {
    setNickname(e.target.value);
  };

  const checkPassword = (password, confirmPassword) => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[.!@#$%])/;

    if (!password) {
      return '비밀번호는 영문 대소문자, 숫자, 특수문자(.!@#$%)를 혼합하여 8-20자로 입력해주세요.';
    } else if (password && !regPassword.test(password)) {
      return '잘못된 비밀번호 양식입니다.영문 대소문자, 숫자, 특수문자(.!@#$%)를 넣어주세요.';
    } else if (password && (password.length < 8 || password.length > 20)) {
      return '비밀번호는 8-20자로 입력해주세요.';
    } else if (password && !confirmPassword) {
      return '올바른 비밀번호입니다.확인 비밀번호를 입력해주세요.';
    } else if (confirmPassword && password !== confirmPassword) {
      return '비밀번호와 확인 비밀번호가 일치하지 않아요.';
    } else {
      return '비밀번호와 확인 비밀번호가 일치합니다.';
    }
  };

  const checkNickname = (props) => {
    if (!nickname) {
      return '닉네임을 입력해주세요.';
    } else {
      return '이미 존재하는 닉네임입니다.';
    }
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file);
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

    await awsS3Bucket.putObject(params).send((response) => {
      const signedUrl = BASE_S3_URL + folderName + '/' + urlIdentifier;
      console.log(signedUrl);
      console.log(response);
      setProfileImageUrl(signedUrl);
    });
  };

  return (
    <Wrapper
      backgroundColor={themeContext.colors.white}
      padding="42px 24px 0px 24px"
    >
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
            placeholder="닉네임"
          />
        </Grid>
        <Grid isFlex>
          <Text size="10px" color={themeContext.colors.blue}>
            이미 존재하는 닉네임입니다
          </Text>
          <Text size="10px" color={themeContext.colors.blue}>
            중복확인
          </Text>
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
            onClick={() => {
              handleUpload('profile', selectedFile);
            }}
            width="148px"
            height={38}
            color={themeContext.colors.white}
            backgroundColor={themeContext.colors.blue}
            margin="0px 0px 8px 0px"
          >
            저장
          </Button>
        </div>
      </Grid>
    </Wrapper>
  );
}

export default EditUserProfile;
