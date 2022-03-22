import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BUCKET,
  awsS3Bucket,
  BASE_S3_URL,
} from '../../shared/utils/awsBucketConfig';
import axios from 'axios';
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
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

function Signup(props) {
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
  const [isOpenModal, setIsOpenModal] = useState(false);

  const userInfo = { email, profileImageUrl, nickname, password };

  useEffect(() => {
    setStep(0);
  }, []);

  const hiddenProfileImageInput = React.useRef(null);
  const handleProfileImageClick = (e) => {
    hiddenProfileImageInput.current.click();
  };

  // const handleSignupButtonClick = (userInfo) => {
  //   // console.log('click');
  //   // localStorage.setItem('nickname', nickname);
  //   // localStorage.setItem('profileImageUrl', profileImageUrl);
  //   dispatch(signupAsync(userInfo));
  //   // navigate('/welcome', { replace: true });
  // };

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
      setProfileImageUrl(signedUrl);
    });
  };

  return (
    <Wrapper
      backgroundColor={themeContext.colors.white}
      padding="70px 0px 0px 0px"
    >
      <Grid padding="0px 24px 10px 24px">
        {(() => {
          switch (step) {
            case 0:
              return <Header label="회원가입" leftArrow />;
            case 1:
              return (
                <Header
                  label="회원가입"
                  leftArrow
                  leftArrowOnClick={() => {
                    setStep(0);
                  }}
                />
              );
            case 2:
              return (
                <Header
                  label="회원가입"
                  leftArrow
                  leftArrowOnClick={() => {
                    setStep(1);
                  }}
                />
              );
            default:
              return;
          }
        })()}
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
                  height="52px"
                  padding="15px 23px 15px 23px"
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
                  height="52px"
                  padding="15px 23px 15px 23px"
                  type="password"
                  margin="17px 0px 8px 0px"
                  onChange={changePassword}
                  placeholder="비밀번호"
                />
                <Input
                  backgroundColor={themeContext.colors.white}
                  color={themeContext.colors.black}
                  width="100%"
                  height="52px"
                  padding="15px 23px 15px 23px"
                  type="password"
                  onChange={changeConfirmPassword}
                  placeholder="비밀번호 확인"
                />
                <Grid margin="16px 0px 0px 0px">
                  <Text size="10px" color={themeContext.colors.blue}>
                    {checkPassword(password, confirmPassword)}
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
                <Grid center width="100%" margin="0px 0px 24px 0px">
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
                    height="52px"
                    padding="15px 23px 15px 23px"
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
                <Grid
                  height="auto"
                  padding="0px 0px 0px 0px"
                  margin="0px 0px 38px 0px"
                >
                  <Text
                    color={themeContext.colors.darkGray}
                    size="14px"
                    lineHeight="20px"
                  >
                    이제 다 왔어요!
                    <br />
                    보일러플레이트의 건강하고 자유로운 토론문화를 위해
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
                      localStorage.setItem('nickname', nickname);
                      localStorage.setItem('profileImageUrl', profileImageUrl);
                      axios
                        .post(
                          'http://ebhojun-env.eba-pra2gntr.ap-northeast-2.elasticbeanstalk.com/api/signup',
                          JSON.stringify(userInfo),
                          { headers: { 'Content-Type': 'application/json' } },
                        )
                        .then((response) => {
                          console.log(response);
                          navigate('/login');
                        });
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
