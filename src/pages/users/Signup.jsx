import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  BUCKET,
  awsS3Bucket,
  BASE_S3_URL,
} from '../../shared/utils/awsBucketConfig';

import apis from 'apis/apis';
import axios from 'axios';
import lo from 'lodash';

import styled, { ThemeContext } from 'styled-components';
import {
  Wrapper,
  Grid,
  Text,
  Image,
  Button,
  Input,
  Header,
  ProgressStepper,
  Survey,
  BasicModal,
} from 'components';

function Signup(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  // Sign-up Process Step
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, []);

  // Email, Password Validation
  const [email, setEmail] = useState('');
  const [emailCheckMessage, setEmailCheckMessage] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [textColor, setTextColor] = useState('error');
  const [isValidEmailByRegex, setIsValidEmailByRegex] = useState(false);
  const [isValidEmailByNotDuplicated, setIsValidEmailByNotDuplicated] =
    useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const emailDebounce = lo.debounce((k) => setEmail(k), 500);
  const emailKeyPress = useCallback(emailDebounce, []);

  const changeEmail = (e) => {
    emailKeyPress(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    checkEmailByRegex(email);
  }, [email]);

  const checkEmailByRegex = (email) => {
    const regEmail = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+){2,3}$/;

    if (email && !regEmail.test(email)) {
      setEmailCheckMessage('이메일을 다시 확인해주세요');
      setIsValidEmailByRegex(false);
    } else if (email && regEmail.test(email)) {
      setEmailCheckMessage('올바른 이메일 형식입니다');
      setIsValidEmailByRegex(true);
    } else {
      setEmailCheckMessage();
      setIsValidEmailByRegex(false);
    }
  };

  const checkDuplicateEmail = async (email) => {
    if (isValidEmailByRegex) {
      const response = await apis.verifyEmail(email);
      if (response.data.message === 'true') {
        setEmailCheckMessage('이미 사용 중인 이메일입니다');
      } else if (response.data.message === 'false') {
        setEmailCheckMessage('사용하실 수 있는 이메일입니다');
        setIsValidEmailByNotDuplicated(true);
      } else {
        setEmailCheckMessage();
      }
    } else {
      return;
    }
  };

  const checkPassword = (password, confirmPassword) => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[.!@#$%])/;

    if (!password) {
      return;
    } else {
      if (!regPassword.test(password)) {
        return '잘못된 비밀번호 양식입니다.영문 대소문자, 숫자, 특수문자(.!@#$%)를 넣어주세요';
      } else if (password.length < 8 || password.length > 20) {
        return '비밀번호는 8-20자로 입력해주세요';
      } else if (!confirmPassword) {
        return '올바른 비밀번호입니다.확인 비밀번호를 입력해주세요';
      } else if (password !== confirmPassword) {
        return '비밀번호와 확인 비밀번호가 일치하지 않아요';
      } else {
        return '비밀번호와 확인 비밀번호가 일치합니다';
      }
    }
  };

  const checkValidEmailPassword = () => {
    if (
      isValidEmailByRegex &&
      isValidEmailByNotDuplicated &&
      checkPassword(password, confirmPassword) ===
        '비밀번호와 확인 비밀번호가 일치합니다'
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Nickname Validation
  const [nickname, setNickname] = useState('');
  const [nicknameCheckMessage, setNicknameCheckMessage] =
    useState('최대 10글자 까지 가능합니다');

  // const nicknameDebounce = lo.debounce((k) => setNickname(k), 1000);
  // const nicknameKeyPress = useCallback(nicknameDebounce, []);

  const changeNickname = (e) => {
    setNickname(e.target.value);
    if (nickname === '') {
      setNicknameCheckMessage('최대 10글자 까지 가능합니다');
    }
  };

  const checkDuplicateNickname = async () => {
    if (nickname === '') {
      return setNicknameCheckMessage('닉네임을 먼저 입력해주세요');
    }
    const response = await apis.verifyNickname(nickname);
    console.log(response);
    if (nickname && response.data.message === 'true') {
      setNicknameCheckMessage('이미 존재하는 닉네임입니다');
    } else if (nickname && response.data.message === 'false') {
      setNicknameCheckMessage('사용하실 수 있습니다');
    } else {
      setNicknameCheckMessage();
    }
  };

  const checkValidNickname = () => {
    if (nicknameCheckMessage === '사용하실 수 있습니다') {
      return true;
    } else {
      return false;
    }
  };

  // Image Uploader
  const [previewProfileImage, setPreviewProfileImage] = useState(
    '/asset/icons/Image_white.svg',
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

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

    await awsS3Bucket.putObject(params).send((response) => {
      const signedUrl = BASE_S3_URL + folderName + '/' + urlIdentifier;
      setProfileImageUrl(signedUrl);
    });
  };

  // Survey
  const labels = [
    '심한 욕설 또는 저속한 표현으로 이용자 다수에게 불쾌감을 주는 경우는 이용이 제한될 수 있습니다.',
    '타인의 신체, 외모, 취향 등에 대해 경멸의 의미를 담아 비하하는 게시물은 제한될 수 있습니다.',
    '특정 계층, 지역, 국민, 종교를 근거없이 비하하거나 비방하는 내용의 게시물은 제한될 수 있습니다.',
    '사회적 소수자를 근거 없이 비하하거나 비방하는 내용의 게시물은 제한될 수 있습니다.',
  ];

  const [checkList, setCheckList] = useState([false, false, false, false]);
  const handleCheckClick = (index) => {
    setCheckList((checks) => checks.map((c, i) => (i === index ? !c : c)));
  };
  const isAllChecked = checkList.every((x) => x);

  // Submit
  const userInfo = { email, profileImageUrl, nickname, password };

  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <BasicModal
        open={openModal}
        onConfirm={() => navigate('/login', { replace: true })}
      >
        Boiler Plate의 회원이 되신 것을 축하합니다!
      </BasicModal>
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
        <SectionWrapper style={{ display: step === 0 ? 'block' : 'none' }}>
          <InnerWrapper>
            <Text color={themeContext.colors.darkGray} lineHeight={'22px'}>
              반가워요 !<br /> 이메일, 비밀번호를 입력해주세요 :)
            </Text>
            <Input
              fluid
              type="text"
              onChange={changeEmail}
              placeholder="이메일(아이디)"
              margin="19px 0 0 0"
              autoFocus
            />
            <Grid isFlex>
              <Text
                small
                color={
                  isValidEmailByRegex
                    ? themeContext.colors.blue
                    : themeContext.colors.red
                }
                style={{ flex: 0.8, padding: '8px 17.5px 8px 17.5px' }}
              >
                {emailCheckMessage}
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
                    checkDuplicateEmail(email);
                  }}
                  style={{
                    cursor: 'pointer',
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
              disabled={!(isValidEmailByRegex && isValidEmailByNotDuplicated)}
            />
            <Input
              fluid
              type="password"
              onChange={changeConfirmPassword}
              placeholder="비밀번호 확인"
              disabled={email === '' || password === ''}
            />
            <Grid margin="16px 17.5px">
              {!password ? (
                <Text small color={themeContext.colors.blue}>
                  비밀번호는 영문 대소문자, 숫자, 특수문자(.!@#$%)를 혼합하여
                  8-20자로 입력해주세요.
                </Text>
              ) : checkPassword(password, confirmPassword) ===
                '올바른 비밀번호입니다.확인 비밀번호를 입력해주세요' ? (
                <Text small color={themeContext.colors.blue}>
                  {checkPassword(password, confirmPassword)}
                </Text>
              ) : checkPassword(password, confirmPassword) ===
                '비밀번호와 확인 비밀번호가 일치합니다' ? (
                <Text small color={themeContext.colors.blue}>
                  {checkPassword(password, confirmPassword)}
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
              disabled={!checkValidEmailPassword()}
            >
              다음으로
            </Button>
          </NextButtonWrapper>
        </SectionWrapper>
        <SectionWrapper style={{ display: step === 1 ? 'block' : 'none' }}>
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
                autoFocus
                maxLength={'10'}
              />
            </Grid>
            <Grid isFlex>
              <Text
                small
                color={themeContext.colors.blue}
                style={{ flex: 0.8, padding: '8px 17.5px 8px 17.5px' }}
              >
                {nicknameCheckMessage}
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
                    checkDuplicateNickname(nickname);
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
              disabled={!checkValidNickname() || nickname === ''}
            >
              다음으로
            </Button>
          </NextButtonWrapper>
        </SectionWrapper>
        <SectionWrapper style={{ display: step === 2 ? 'block' : 'none' }}>
          <InnerWrapper>
            <Grid
              height="auto"
              padding="0px 0px 0px 0px"
              margin="0px 0px 38px 0px"
            >
              <Text color={themeContext.colors.darkGray} lineHeight="20px">
                이제 다 왔어요!
                <br />
                보일러플레이트의 건강하고 자유로운 토론문화를 위해
                <br />
                아래 사항을 꼭 준수해주세요 :)
              </Text>
            </Grid>
            {labels.map((label, idx) => (
              <Survey
                key={idx}
                label={label}
                onClick={() => handleCheckClick(idx)}
                checked={checkList[idx]}
              />
            ))}
          </InnerWrapper>
          <NextButtonWrapper>
            <Button
              onClick={() => {
                // localStorage.setItem('nickname', nickname);
                // localStorage.setItem('profileImageUrl', profileImageUrl);
                axios
                  .post(
                    `${process.env.REACT_APP_API_URL}/api/signup`,
                    JSON.stringify(userInfo),
                    { headers: { 'Content-Type': 'application/json' } },
                  )
                  .then((response) => {
                    setOpenModal(true);
                  });
              }}
              secondary
              disabled={!isAllChecked}
            >
              확인
            </Button>
          </NextButtonWrapper>
        </SectionWrapper>
      </Wrapper>
    </>
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
