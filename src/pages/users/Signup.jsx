import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BUCKET,
  awsS3Bucket,
  BASE_S3_URL,
} from '../../shared/utils/awsBucketConfig';
import styled from 'styled-components';
import axios from 'axios';
import {
  signupAsync,
  verifyEmailAsync,
  verifyNicknameAsync,
} from '../../modules/users';

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
import apis from 'apis/apis';

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

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    const regEmail = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+){2,3}$/;

    if (email && !regEmail.test(email)) {
      return '이메일 형식이 틀렸습니다. 올바른 이메일을 입력해주세요.';
    }
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

  const checkEmail = (email) => {
    const regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email && regEmail.test(regEmail)) {
      return true;
    } else {
      return false;
    }
  };

  const checkPassword = (password, confirmPassword) => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[.!@#$%])/;

    if (password && !regPassword.test(password)) {
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

  const checkEmailPassword = (email, password, confirmPassword) => {
    if (
      checkEmail(email) &&
      checkPassword(password, confirmPassword) ===
        '비밀번호와 확인 비밀번호가 일치합니다'
    ) {
      return true;
    } else {
      return false;
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
      style={{ overflow: 'hidden', height: '100%' }}
    >
      <FixedHeader>
        <Grid padding="0px 24px 0px 24px">
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
      </FixedHeader>
      {(() => {
        switch (step) {
          case 0:
            return (
              <SectionWrapper>
                <InnerWrapper>
                  <Text
                    color={themeContext.colors.darkGray}
                    lineHeight={'22px'}
                  >
                    반가워요 !<br /> 이메일, 비밀번호를 입력해주세요 :)
                  </Text>
                  <Input
                    fluid
                    type="text"
                    onChange={changeEmail}
                    placeholder="이메일(아이디)"
                    margin="19px 0 0 0"
                  />
                  <Grid isFlex>
                    <Text
                      small
                      color={themeContext.colors.red}
                      style={{ flex: 0.8, padding: '8px 17.5px 8px 17.5px' }}
                    >
                      {validateEmail(email)}
                    </Text>
                    <div
                      style={{
                        alignItems: 'flex-end',
                        width: '100%',
                        padding: '8px 17.5px 8px 17.5px',
                        flex: 0.2,
                      }}
                    >
                      <Grid
                        onClick={() => {
                          dispatch(verifyEmailAsync(email));
                        }}
                      >
                        <Text small color={themeContext.colors.blue} right>
                          중복확인
                        </Text>
                      </Grid>
                    </div>
                  </Grid>
                  <Input
                    fluid
                    type="password"
                    margin="16px 0px 8px 0px"
                    onChange={changePassword}
                    placeholder="비밀번호"
                  />
                  <Input
                    fluid
                    type="password"
                    onChange={changeConfirmPassword}
                    placeholder="비밀번호 확인"
                  />
                  <Grid margin="16px 17.5px">
                    {!password ? (
                      <Text small color={themeContext.colors.blue}>
                        비밀번호는 영문 대소문자, 숫자, 특수문자(.!@#$%)를
                        혼합하여 8-20자로 입력해주세요.
                      </Text>
                    ) : (
                      <Text small color={themeContext.colors.red}>
                        {checkPassword(password, confirmPassword)}
                      </Text>
                    )}
                  </Grid>
                </InnerWrapper>
                <NextButtonWrapper>
                  <Button
                    onClick={() => {
                      setStep(1);
                    }}
                    secondary
                    size={'large'}
                  >
                    다음으로
                  </Button>
                </NextButtonWrapper>
              </SectionWrapper>
            );
          case 1:
            return (
              <SectionWrapper>
                <InnerWrapper>
                  <Grid padding="0px 0px 38px 0px">
                    <Text color={themeContext.colors.darkGray}>
                      사용하실 닉네임과 프로필이미지를 설정해주세요 :)
                    </Text>
                  </Grid>
                  <Grid center width="100%" margin="0px 0px 18px 0px">
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
                  <Grid>
                    <Input
                      fluid
                      type="text"
                      onChange={changeNickname}
                      placeholder="닉네임"
                      margin="8px 0 0 0"
                    />
                  </Grid>
                  <Grid isFlex>
                    <Text
                      small
                      color={themeContext.colors.blue}
                      style={{ flex: 0.8, padding: '8px 17.5px 8px 17.5px' }}
                    >
                      이미 존재하는 닉네임입니다
                    </Text>
                    <div
                      style={{
                        alignItems: 'flex-end',
                        width: '100%',
                        padding: '8px 17.5px 8px 17.5px',
                        flex: 0.2,
                      }}
                    >
                      <Grid
                        onClick={() => {
                          dispatch(verifyNicknameAsync(nickname));
                        }}
                      >
                        <Text small color={themeContext.colors.blue}>
                          중복확인
                        </Text>
                      </Grid>
                    </div>
                  </Grid>
                </InnerWrapper>
                <NextButtonWrapper>
                  <Button
                    onClick={() => {
                      setStep(2);
                      handleUpload('profile', selectedFile);
                    }}
                    secondary
                    size={'large'}
                  >
                    다음으로
                  </Button>
                </NextButtonWrapper>
              </SectionWrapper>
            );
          case 2:
            return (
              <SectionWrapper>
                <InnerWrapper>
                  <Grid
                    height="auto"
                    padding="0px 0px 0px 0px"
                    margin="0px 0px 38px 0px"
                  >
                    <Text
                      color={themeContext.colors.darkGray}
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
                </InnerWrapper>
                <NextButtonWrapper>
                  <Button
                    onClick={() => {
                      localStorage.setItem('nickname', nickname);
                      localStorage.setItem('profileImageUrl', profileImageUrl);
                      axios
                        .post(
                          `${process.env.REACT_APP_API_URL}/api/signup`,
                          JSON.stringify(userInfo),
                          { headers: { 'Content-Type': 'application/json' } },
                        )
                        .then((response) => {
                          navigate('/login');
                        });
                    }}
                    secondary
                  >
                    다음으로
                  </Button>
                </NextButtonWrapper>
              </SectionWrapper>
            );
          default:
            return null;
        }
      })()}
    </Wrapper>
  );
}
const FixedHeader = styled.div`
  position: fixed;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;
const SectionWrapper = styled.div`
  padding: 32px 24px 24px 24px;
  height: ${({ theme }) => `calc(100% - ${theme.style.header.height} + 5px)`};
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => `calc(${theme.style.header.height} + 5px)`};
  overflow-y: auto;
`;
const InnerWrapper = styled.div`
  flex: 0.5;
`;
const NextButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.5;
`;

export default Signup;
