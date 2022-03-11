import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('뿡뿡이');
  const [imageUrl, setImageUrl] = useState(
    'https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb81cbca1649556026b3c72a3ee9382429b',
  );

  const labels = ['회원가입', '회원가입', '회원가입', '회원가입'];

  console.log(imageUrl);
  console.log(step);

  return (
    <Wrapper padding="53px 24px 53px 24px">
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
                  반가워요 ! 이름과 이메일, 비밀번호를 입력해주세요 :)
                </Text>
                <Input placeholder="이름" marign-bottom="16px" />
                <Input placeholder="이메일(아이디)" marign-bottom="16px" />
                <Button
                  height={48}
                  backgroundColor={themeContext.colors.tertiary}
                >
                  중복확인
                </Button>
                <Text size="10px">비밀번호 찾기</Text>
                <Input placeholder="비밀번호" marign-bottom="16px" />
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
                <Image shape="circle" size={134} />
                <Input placeholder="이름" marign-bottom="16px" />
                <Input placeholder="닉네임" />
                <Button backgroundColor={themeContext.colors.tertiary}>
                  중복확인
                </Button>

                <Text>아직 닉네임을 입력하지 않았어요!</Text>
                <Button
                  _onClick={() => setStep(2)}
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
                    return;
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
