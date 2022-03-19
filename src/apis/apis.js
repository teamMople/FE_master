import axios from 'axios';
import { getCookie } from '../shared/utils/Cookie';

// member : 'http://18.117.124.131'

const api = axios.create({
  baseURL: 'http://18.117.124.131',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
});

/* eslint-disable no-param-reassign */
api.interceptors.request.use(function (config) {
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
  editMyInfo: (email, name, nickname, password) =>
    api.put('/api/user/update', { email, name, nickname, password }),
  findMyPassword: (email) => api.post('/api/user/mypw', { email }),
  // 비밀번호 생성
  // 이메일 중복 확인
  // 닉네임 중복 확인

  createBoard: (title, content, imageUrl, category) =>
    api.post('/api/board', { title, content, imageUrl, category }),
  getBoardList: () => api.get('/api/board'),
  getBoardListByCategory: (categoryName) =>
    api.get(`/api/board/${categoryName}`, { categoryName }),
  getDetail: (boardId) => api.get(`/api/board/${boardId}`, { boardId }),
  deleteBoard: (boardId) => api.delete(`/api/board/${boardId}`, { boardId }),

  agreeBoard: (boardId) => api.get(`/api/board/agree/${boardId}`, { boardId }),
  disagreeBoard: (boardId) =>
    api.get(`/api/board/disagree/${boardId}`, { boardId }),
  recommentBoard: (boardId) =>
    api.get(`/api/board/recommend/${boardId}`, { boardId }),

  createComment: (boardId, content) =>
    api.post(`/api/comment/${boardId}`, { boardId, content }),
  getCommentsByBoard: (boardId) =>
    api.get(`/api/comment/${boardId}`, { boardId }),
  deleteComment: (commentId) =>
    api.delete(`/api/comment/${commentId}`, { commentId }),
  recommendComment: (commentId) =>
    api.get(`/api/comment/recommend/${commentId}`, { commentId }),

  // 실시간 토론방
};

export default apis;
