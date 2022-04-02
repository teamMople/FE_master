import axios from 'axios';
import { getCookie } from '../shared/utils/Cookie';

// 액세스 토큰 없이 접근 가능한 API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
  withCredentials: true,
});

// 토큰이 있어야 접근 가능한 API
const authApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
  withCredentials: true,
});

const openviduApi = axios.create({
  baseURL: process.env.REACT_APP_OPENVIDU_URL,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
  withCredentials: true,
});

/* eslint-disable no-param-reassign */
authApi.interceptors.request.use(function (config) {
  const accessToken = getCookie('token');
  config.headers.common.Authorization = `Bearer ${accessToken}`;
  return config;
});

openviduApi.interceptors.request.use(function (config) {
  const accessToken = getCookie('token');
  config.headers.common.Authorization = `Bearer ${accessToken}`;
  return config;
});
/* eslint-disable no-param-reassign */

const apis = {
  // 회원
  signup: (email, profileImageUrl, nickname, password) =>
    api.post('/api/signup', { email, profileImageUrl, nickname, password }),
  login: (email, password) => api.post('/api/login', { email, password }),
  kakaoLogin: (kakaoAuthCode) =>
    api.post('/api/kakao/login', { kakaoAuthCode }),
  logout: () => api.post('/api/logout'),
  // to-dos
  editMyInfo: (nickname, profileImageUrl) =>
    authApi.post('/auth/api/user/update', {
      nickname,
      profileImageUrl,
    }),
  findMyPassword: (email) => api.post('/api/user/mypw', { email }),
  verifyEmail: (email) => api.post('/api/user/check/Email', { email }),
  verifyNickname: (nickname) =>
    api.post('/api/user/check/Nickname', { nickname }),

  // 게시물
  createBoard: (title, content, imageUrl, category) =>
    authApi.post('/auth/api/board', { title, content, imageUrl, category }),
  getBoardList: () => authApi.get('/auth/api/board'),
  getBoardListByCategory: (categoryName) =>
    authApi.get(
      `/auth/api/board/category/${encodeURIComponent(categoryName)}`,
      {
        categoryName,
      },
    ),
  getMyBoardList: () => authApi.get('/auth/api/board/myboard'),
  getMyCommentList: () => authApi.get('/auth/api/board/mycomments'),
  getDetail: (boardId) =>
    authApi.get(`/auth/api/board/${boardId}`, { boardId }),
  deleteBoard: (boardId) =>
    authApi.delete(`/auth/api/board/${boardId}`, { boardId }),
  agreeBoard: (boardId) => authApi.get(`/auth/api/board/agree/${boardId}`),
  disagreeBoard: (boardId) =>
    authApi.get(`/auth/api/board/disagree/${boardId}`),
  recommendBoard: (boardId) =>
    authApi.get(`/auth/api/board/recommend/${boardId}`),
  createComment: (boardId, content) =>
    authApi.post(`/auth/api/comment/${boardId}`, { boardId, content }),
  getCommentsByBoard: (boardId) => authApi.get(`/auth/api/comment/${boardId}`),
  deleteComment: (commentId) =>
    authApi.delete(`/auth/api/comment/${commentId}`, { commentId }),
  recommendComment: (commentId) =>
    authApi.get(`/auth/api/comment/recommend/${commentId}`, { commentId }),
  createComment: (boardId, content) =>
    authApi.post('/auth/api/comment', { boardId, content }),
  getCommentListByBoard: () => authApi.get('/auth/api/comment'),
  deleteComment: (commentId) =>
    authApi.delete(`/auth/api/comment/${commentId}`),
  recommendComment: (commentId) =>
    authApi.get(`/auth/api/comment/recommend/${commentId}`),
  searchBoard: (search) => authApi.get(`/auth/api/board/search/${search}`),

  // 알람
  pushAlarm: (targetToken) =>
    authApi.post('/auth/api/fcm/register', { targetToken }),

  // 대댓글
  createReplyComment: (commentId, content) =>
    authApi.post(`/auth/api/comment/${commentId}/reply`, {
      content,
    }),
  getReplyCommentListByComment: (commentId) =>
    authApi.get(`/auth/api/comment/${commentId}/reply`),
  recommendReplyComment: (commentId, replyId) =>
    authApi.get(`/auth/api/comment/${commentId}/reply/recommend/${replyId}`),

  // 실시간 토론방
  getLiveRoomList: () => authApi.get('/api/chat/rooms/onair'),
  getLiveRoomListByCategory: (categoryName) =>
    authApi.get(`/api/chat/rooms/${categoryName}`),
  searchLiveRoom: (search) =>
    authApi.get(`/api/chat/rooms/onair/keyword/${search}`),

  createRoom: (data) => authApi.post('/auth/api/chat/room', data),
  joinRoom: (data) => authApi.post('/auth/api/chat/room/join', data),
  leaveRoom: (data) => authApi.post('/auth/api/chat/room/leave', data),
  closeRoom: (data) => authApi.post('/auth/api/chat/room/close', data),

  ovGetToken: (data) => openviduApi.post('/auth/api/openvidu/getToken', data),
  ovDeleteToken: (data) =>
    openviduApi.post('/auth/api/openvidu/deleteToken', data),
};

export default apis;
