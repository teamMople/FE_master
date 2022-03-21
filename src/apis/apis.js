import axios from 'axios';
import { getCookie } from '../shared/utils/Cookie';

// 액세스 토큰 없이 접근 가능한 API
const api = axios.create({
  baseURL:
    'http://ebhojun-env.eba-pra2gntr.ap-northeast-2.elasticbeanstalk.com/',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
});

// 토큰이 있어야 접근 가능한 API
const authApi = axios.create({
  baseURL:
    'http://ebhojun-env.eba-pra2gntr.ap-northeast-2.elasticbeanstalk.com/',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
});

/* eslint-disable no-param-reassign */
authApi.interceptors.request.use(function (config) {
  const accessToken = getCookie('token');
  config.headers.common.Authorization = `Bearer ${accessToken}`;
  return config;
});
/* eslint-disable no-param-reassign */

const apis = {
  signup: (email, profileImageUrl, nickname, password) =>
    api.post('/api/signup', { email, profileImageUrl, nickname, password }),
  login: (email, password) => api.post('/api/login', { email, password }),
  kakaoLogin: (kakaoAuthCode) =>
    api.post('/api/kakao/login', { kakaoAuthCode }),
  logout: () => api.get('/api/logout'),
  // to-dos
  editMyInfo: (email, profileImageUrl, nickname, password) =>
    api.put('/api/user/update', { email, profileImageUrl, nickname, password }),
  findMyPassword: (email) => api.post('/api/user/mypw', { email }),
  // 비밀번호 생성
  // 이메일 중복 확인
  // 닉네임 중복 확인

  createBoard: (title, content, imageUrl, category) =>
    authApi.post('/auth/api/board', { title, content, imageUrl, category }),
  getBoardList: () => authApi.get('/auth/api/board'),
  getBoardListByCategory: (categoryName) =>
    authApi.get(`/auth/api/board/${categoryName}`, { categoryName }),
  getDetail: (boardId) =>
    authApi.get(`/auth/api/board/${boardId}`, { boardId }),
  deleteBoard: (boardId) =>
    authApi.delete(`/auth/api/board/${boardId}`, { boardId }),
  getMyBoardList: () => authApi.get('/auth/api/board/myboard'),
  getMyCommentList: () => authApi.get('/auth/api/board/mycomments'),
  agreeBoard: (boardId) =>
    authApi.get(`/auth/api/board/agree/${boardId}`, { boardId }),
  disagreeBoard: (boardId) =>
    authApi.get(`/api/board/disagree/${boardId}`, { boardId }),
  recommentBoard: (boardId) =>
    authApi.get(`/api/board/recommend/${boardId}`, { boardId }),
  createComment: (boardId, content) =>
    authApi.post(`/api/comment/${boardId}`, { boardId, content }),
  getCommentsByBoard: (boardId) =>
    authApi.get(`/api/comment/${boardId}`, { boardId }),
  deleteComment: (commentId) =>
    authApi.delete(`/api/comment/${commentId}`, { commentId }),
  recommendComment: (commentId) =>
    authApi.get(`/api/comment/recommend/${commentId}`, { commentId }),
  createComment: (boardId, content) =>
    authApi.post('/auth/api/comment', { boardId, content }),
  getCommentListByBoard: () => authApi.get('/auth/api/comment'),
  deleteComment: (commentId) =>
    authApi.delete(`/auth/api/comment/${commentId}`),
  recommendComment: (commentId) =>
    authApi.get(`/auth/api/comment/recommend/${commentId}`),
  searchBoard: (search) => authApi.get(`/auth/api/comment/search/${search}`),
  pushAlarm: () => authApi.post('/auth/api/fcm/register'),
  createReplyComment: (commentId) =>
    authApi.post(`/auth/api/comment/${commentId}/reply`),
  getReplyCommentList: (commentId) =>
    authApi.get(`/auth/api/comment/${commentId}/reply`),
  // 실시간 토론방
};

export default apis;
