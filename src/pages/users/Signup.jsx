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
  Image,
  Text,
  Input,
  Button,
} from '../../components/atoms';
import ProgressStepper from '../../components/molecules/ProgressStepper';

function Signup(props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('noname');
  const [password, setPassword] = useState('');
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

  useEffect(() => {
    console.log(userInfo);
  }, [email, nickname, password, profileImageUrl]);

  return (
    <Wrapper padding="53px 24px 53px 24px">
      <Grid isFlex>
        <Text>회원가입</Text>
      </Grid>
      <ProgressStepper
        steps={3}
        currentStep={step}
        backgroundColor={themeContext.colors.primary}
        highlightColor={themeContext.colors.quaternary}
      />
      {(() => {
        switch (step) {
          case 0:
            return (
              <>
                <Text size="20px">
                  반가워요 ! 이메일, 비밀번호를 입력해주세요 :)
                </Text>
                <Input
                  _onChange={changeEmail}
                  placeholder="이메일(아이디)"
                  marign-bottom="16px"
                />
                <Button
                  height={48}
                  backgroundColor={themeContext.colors.tertiary}
                >
                  중복확인
                </Button>
                <Text size="10px">비밀번호 찾기</Text>
                <Input
                  _onChange={changePassword}
                  placeholder="비밀번호"
                  marign-bottom="16px"
                />
                <Input placeholder="비밀번호 확인" marign-bottom="16px" />
                <Text>
                  비밀번호는 영문 대소문자, 숫자, 특수문자(.!@#$%)를 혼합하여
                  8~20자로 입력해주세요
                </Text>
                <Button
                  _onClick={() => setStep(1)}
                  width="155px"
                  height={34}
                  backgroundColor={themeContext.colors.primary}
                >
                  다음
                </Button>
              </>
            );
          case 1:
            return (
              <>
                <Text size="20px">
                  사용하실 닉네임과 프로필이미지를 설정해주세요 :)
                </Text>
                <div>
                  <Image
                    shape="circle"
                    size={134}
                    src={previewProfileImage}
                    _onClick={handleProfileImageClick}
                  />
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    accept=".jpg,.jpeg,.png"
                    ref={hiddenProfileImageInput}
                    onChange={onImageChange}
                  />
                </div>
                <Input _onChange={changeNickname} placeholder="닉네임" />
                <Button backgroundColor={themeContext.colors.tertiary}>
                  중복확인
                </Button>

                <Text>아직 닉네임을 입력하지 않았어요!</Text>
                <Button
                  _onClick={() => {
                    setStep(2);
                    handleUpload('profile', selectedFile);
                  }}
                  width="50%"
                  height={34}
                  backgroundColor={themeContext.colors.primary}
                >
                  다음
                </Button>
              </>
            );
          case 2:
            return (
              <>
                <Text size="20px">
                  이제 다 왔어요! <br />
                  보일러 플레이트의 건강하고 자유로운 토론문화를 위해, 아래
                  사항을 꼭 준수해주세요 :)
                </Text>
                <Button
                  _onClick={() => {
                    dispatch(signupAsync(userInfo));
                    navigate('/welcome', { replace: true });
                  }}
                  width="50%"
                  height={34}
                  backgroundColor={themeContext.colors.primary}
                >
                  다음
                </Button>
              </>
            );
          default:
            return null;
        }
      })()}
    </Wrapper>
  );
}

export default Signup;
