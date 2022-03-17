import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BUCKET,
  awsS3Bucket,
  BASE_S3_URL,
} from '../../shared/utils/awsBucketConfig';

import { useAppDispatch } from '../../modules/configStore';
import { signupAsync } from '../../modules/users';

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

function Signup(props) {
  const dispatch = useAppDispatch();
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

    await awsS3Bucket.putObject(params).send(() => {
      const signedUrl = BASE_S3_URL + folderName + '/' + urlIdentifier;
      console.log(signedUrl);
      setProfileImageUrl(signedUrl);
    });
  };

  const userInfo = { email, profileImageUrl, nickname, password };

  return (
    <Wrapper
      backgroundColor={themeContext.colors.white}
      padding="70px 0px 0px 0px"
    >
      <Grid padding="0px 24px 0px 24px">
        <Header label="회원가입" leftArrow />
      </Grid>
      <ProgressStepper
        steps={3}
        currentStep={step}
        backgroundColor={themeContext.colors.white}
        highlightColor={themeContext.colors.blue}
      />
      {(() => {
        switch (step) {
          case 0:
            return (
              <Grid padding="32px 24px 0px 24px">
                <Text color={themeContext.colors.darkGray} size="14px">
                  반가워요 ! 이메일, 비밀번호를 입력해주세요 :)
                </Text>
                <Input
                  backgroundColor={themeContext.colors.white}
                  color={themeContext.colors.black}
                  width="100%"
                  margin="19px 0px 17px 0px"
                  type="text"
                  onChange={changeEmail}
                  placeholder="이메일(아이디)"
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    padding: '0px 17.5px 0px 17.5px',
                  }}
                >
                  <Text size="10px" color={themeContext.colors.blue}>
                    중복확인
                  </Text>
                </div>
                <Input
                  backgroundColor={themeContext.colors.white}
                  color={themeContext.colors.black}
                  width="100%"
                  type="password"
                  margin="17px 0px 8px 0px"
                  onChange={changePassword}
                  placeholder="비밀번호"
                />
                <Input
                  backgroundColor={themeContext.colors.white}
                  color={themeContext.colors.black}
                  width="100%"
                  type="password"
                  onChange={changeConfirmPassword}
                  placeholder="비밀번호 확인"
                />
                <Text color={themeContext.colors.darkGray} size="14px">
                  비밀번호는 영문 대소문자, 숫자, 특수문자(.!@#$%)를 혼합하여
                  8~20자로 입력해주세요
                </Text>
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
                    onClick={() => setStep(1)}
                    width="148px"
                    height={38}
                    color={themeContext.colors.white}
                    backgroundColor={themeContext.colors.blue}
                    margin="0px 0px 8px 0px"
                  >
                    다음으로
                  </Button>
                </div>
              </Grid>
            );
          case 1:
            return (
              <Grid padding="32px 24px 0px 24px">
                <Grid padding="0px 0px 38px 0px">
                  <Text color={themeContext.colors.darkGray} size="14px">
                    사용하실 닉네임과 프로필이미지를 설정해주세요 :)
                  </Text>
                </Grid>
                <Grid center width="100%">
                  <Image
                    shape="circle"
                    size={134}
                    src={previewProfileImage}
                    onClick={handleProfileImageClick}
                  />
                </Grid>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept=".jpg,.jpeg,.png"
                  ref={hiddenProfileImageInput}
                  onChange={onImageChange}
                />
                <Grid>
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
                      setStep(2);
                      handleUpload('profile', selectedFile);
                    }}
                    width="148px"
                    height={38}
                    color={themeContext.colors.white}
                    backgroundColor={themeContext.colors.blue}
                    margin="0px 0px 8px 0px"
                  >
                    다음으로
                  </Button>
                </div>
              </Grid>
            );
          case 2:
            return (
              <Grid padding="32px 24px 0px 24px">
                <Grid padding="0px 0px 38px 0px">
                  <Text color={themeContext.colors.darkGray} size="14px">
                    이제 다 왔어요!
                    <br />
                    건강하고 자유로운 토론문화를 위해,
                    <br />
                    아래 사항을 꼭 준수해주세요 :)
                  </Text>
                </Grid>
                <Survey />
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
                      dispatch(signupAsync(userInfo));
                      navigate('/welcome', { replace: true });
                    }}
                    width="148px"
                    height={38}
                    color={themeContext.colors.white}
                    backgroundColor={themeContext.colors.blue}
                    margin="0px 0px 8px 0px"
                  >
                    다음으로
                  </Button>
                </div>
              </Grid>
            );
          default:
            return null;
        }
      })()}
    </Wrapper>
  );
}

export default Signup;
