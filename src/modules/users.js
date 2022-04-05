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
    console.log(code);
    await axios
      .get(`https://api.www.boiler-plate.org/api/kakao/login?code=${code}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setCookie('token', response.data.access_token, 1);
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('nickname', response.data.nickname);
          localStorage.setItem(
            'profileImageUrl',
            response.data.profileImageUrl,
          );
          window.location.replace('/home');
        }
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
  async (userInfo, thunkAPI) => {
    const { nickname, profileImageUrl } = userInfo;
    console.log(userInfo);
    await apis.editMyInfo(nickname, profileImageUrl).then((response) => {
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem('nickname', nickname);
        localStorage.setItem('profileImageUrl', profileImageUrl);
        window.location.replace('/settings');
      }
    });
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

export const inactivateUserAsync = createAsyncThunk(
  'users/inactivateUser',
  async (email) => {
    await apis
      .inactivateUser(email)
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('email');
          localStorage.removeItem('nickname');
          localStorage.removeItem('profileImageUrl');
          window.location.replace('/');
        }
      })
      .catch((err) => {
        window.alert('비활성화에 실패했습니다');
      });
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
    },
    [loginAsync.rejected]: (state, action) => {
      state.isLogin = false;
    },
    [googleLoginAsync.pending]: (state, action) => {
      state.isLogin = false;
    },
    [googleLoginAsync.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
    },
    [googleLoginAsync.rejected]: (state, action) => {
      state.isLogin = false;
    },
    [naverLoginAsync.pending]: (state, action) => {
      state.isLogin = false;
    },
    [naverLoginAsync.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
    },
    [naverLoginAsync.rejected]: (state, action) => {
      state.isLogin = false;
    },
    [kakaoLoginAsync.pending]: (state, action) => {
      state.isLogin = false;
    },
    [kakaoLoginAsync.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
    },
    [kakaoLoginAsync.rejected]: (state, action) => {
      state.isLogin = false;
    },
    [signupAsync.pending]: (state, action) => {
      state.isLogin = false;
    },
    [signupAsync.fulfilled]: (state, { payload }) => {
      state.isLogin = false;
    },
    [signupAsync.rejected]: (state, action) => {
      state.isLogin = false;
    },
  },
});

export const { logout } = userSlice.actions;
export const selectUserState = (state) => state.users;
export default userSlice.reducer;
