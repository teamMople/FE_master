import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apis from '../apis/apis';
import { deleteCookie, setCookie } from '../shared/utils/Cookie';

const emailRegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const loginUser = JSON.parse(localStorage.getItem('loginUser'));
const loginUserInitialState = loginUser
  ? { isLogin: true, loginUser }
  : { isLogin: false, loginUser: null };

const isRightEmailType = (email) => {
  if (email.match(emailRegExp) === null) {
    return false;
  }
  return true;
};

export const loginAsync = createAsyncThunk(
  'users/login',
  async (userInfo, thunkAPI) => {
    const navigate = useNavigate();
    const { email, password } = userInfo;

    if (email === '' || password === '') {
      window.alert('이메일, 비밀번호 모두 입력해주세요.');
    } else {
      apis
        .login(email, password)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setCookie('token', response.headers.authorization, 1);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('nickname', response.data.nickname);
            navigate('/home');
          }
        })
        .catch((e) => {});
    }
  },
);

export const googleLoginAsync = createAsyncThunk(
  'users/googleLogin',
  async (code) => {
    const navigate = useNavigate();
    await axios
      .get(`http://13.125.244.227:8080/api/google/login?code=${code}`)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  },
);

export const naverLoginAsync = createAsyncThunk(
  'users/naverLogin',
  async (code) => {
    const navigate = useNavigate();
    await axios
      .get(`http://13.125.244.227:8080/api/naver/login?code=${code}`)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  },
);

export const kakaoLoginAsync = createAsyncThunk(
  'users/kakaoLogin',
  async (code) => {
    const navigate = useNavigate();
    await axios
      .get(
        `https://ebhojun-env.eba-pra2gntr.ap-northeast-2.elasticbeanstalk.com/api/kakao/login?code=${code}`,
      )
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  },
);

export const logoutAsync = createAsyncThunk('users/logout', async () => {
  const navigate = useNavigate();

  await apis
    .logout()
    .then((response) => {
      if (response.status === '200') {
        deleteCookie('token');
        localStorage.removeItem('email');
        localStorage.removeItem('nickname');
        localStorage.removeItem('profileImageUrl');
        navigate('/');
      }
    })
    .catch((error) => {
      if (error) {
        window.alert('잘못된 로그아웃 요청입니다.');
        console.log(error.response.message); // 어떻게 서버에서 에러 메시지 오는지 확인
      }
    });
});

export const signupAsync = createAsyncThunk(
  'users/signup',
  async (userInfo) => {
    const navigate = useNavigate();
    console.log(userInfo);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/signup`,
        JSON.stringify(userInfo),
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then((response) => {
        console.log(response);
        if (response.status === 'OK') {
          navigate('/welcome', { replace: true });
        } else if (response.status === 'BAD_REQUEST') {
          window.alert('다시 회원가입을 진행해주세요.');
          navigate('/signup', { replace: true });
        }
      })
      .catch((error) => {
        if (error) {
          window.alert('잘못된 회원 가입 요청입니다.');
          console.log(error.response.data.message); // 어떻게 서버에서 에러 메시지 오는지 확인
        }
      });
  },
);

export const editMyInfo = createAsyncThunk(
  'users/editUserInfo',
  async ({ email, name, nickname, password }, thunkAPI) => {
    if (email === '' || name === '' || nickname === '' || password === '') {
      window.alert('모든 항목들을 기입해주세요');
    } else if (isRightEmailType === false) {
      window.alert('올바른 이메일 형식이 아닙니다.');
    } else {
      await apis
        .editMyInfo(email, name, nickname, password)
        .then((response) => {
          return response.data.status === 'ok' && response.data;
        })
        .catch((error) => {
          if (error) {
            window.alert('잘못된 회원 수정 요청입니다.');
            console.log(error.response.data.message); // 어떻게 서버에서 에러 메시지 오는지 확인
          }
          return thunkAPI.rejectWithValue();
        });
    }
  },
);

export const findMyPassword = createAsyncThunk(
  'users/findMyPassword',
  async ({ email }, thunkAPI) => {
    if (email && isRightEmailType(email)) {
      await apis
        .findMyPassword(email)
        .then((response) => {
          return response.data.status === 'ok' && response.data;
        })
        .catch((error) => {
          if (error) {
            window.alert('잘못된 비밀번호 찾기 요청입니다.');
            console.log(error.response.data.message); // 어떻게 서버에서 에러 메시지 오는지 확인
          }
          return thunkAPI.rejectWithValue();
        });
    } else {
      window.alert('올바른 이메일 형식이 아닙니다.');
    }
  },
);

export const verifyEmailAsync = createAsyncThunk(
  'users/verifyEmail',
  async (email) => {
    await apis.verifyEmail(email).then((response) => response.data);
  },
);

export const verifyNicknameAsync = createAsyncThunk(
  'users/verifyEmail',
  async (nickname) => {
    await apis
      .verifyNickname(nickname)
      .then((response) => console.log(response));
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState: loginUserInitialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      deleteCookie('token');
      localStorage.removeItem('loginUser');
      window.location.assign('/');
    },
  },
  extraReducers: {
    [loginAsync.pending]: (state, action) => {
      state.isLogin = false;
    },
    [loginAsync.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
      return { ...state, payload };
    },
    [loginAsync.rejected]: (state, action) => {
      state.isLogin = false;
    },
    [googleLoginAsync.pending]: (state, action) => {
      state.isLogin = false;
    },
    [googleLoginAsync.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
      return { ...state, payload };
    },
    [googleLoginAsync.rejected]: (state, action) => {
      state.isLogin = false;
    },
    [naverLoginAsync.pending]: (state, action) => {
      state.isLogin = false;
    },
    [naverLoginAsync.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
      return { ...state, payload };
    },
    [naverLoginAsync.rejected]: (state, action) => {
      state.isLogin = false;
    },
    [kakaoLoginAsync.pending]: (state, action) => {
      state.isLogin = false;
    },
    [kakaoLoginAsync.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
      return { ...state, payload };
    },
    [kakaoLoginAsync.rejected]: (state, action) => {
      state.isLogin = false;
    },
    [signupAsync.pending]: (state, action) => {
      state.isLogin = false;
    },
    [signupAsync.fulfilled]: (state, { payload }) => {
      state.isLogin = false;
      return { ...state, payload };
    },
    [signupAsync.rejected]: (state, action) => {
      state.isLogin = false;
    },
  },
});

export const { logout } = userSlice.actions;
export const selectUserState = (state) => state.users;
export default userSlice.reducer;
