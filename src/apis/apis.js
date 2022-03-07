import axios from "axios";
import { getCookie } from "../shared/Cookie";

const api = axios.create({
	baseURL: "http://localhost:3000",
	headers: {
		"content-type": "application/json;charset=UTF-8",
		accept: "application/json",
	},
});

api.interceptors.request.use(function (config) {
	const accessToken = getCookie("token");
	config.headers.common["Authorization"] = `Bearer ${accessToken}`;
	return config;
});

export const apis = {
    signup: (email, name, nickname, password) => api.post("/api/signup"),
    login: (email, password) => api.post("/api/login"),
    editUserInfo: (email, name, nickname, password) => api.put("/api/user/update"),
    findPassword: (email) => api.post("/api/user/mypw"),
    // 비밀번호 생성
    // 이메일 중복 확인
    // 닉네임 중복 확인

    createBoard: (title, content, imageUrl, category) => api.post("/api/board"),
    getBoardList: () => api.get("/api/board"),
    getBoardListByCategory: (categoryName) => api.get(`/api/board/${categoryName}`),
    getDetail: (boardId) => api.get(`/api/board/${boardId}`),
    deleteBoard: (boardId) => api.delete(`/api/board/${boardId}`),

    agreeBoard: (boardId) => api.get(`/api/board/agree/${boardId}`),
    disagreeBoard: (boardId) => api.get(`/api/board/disagree/${boardId}`),
    recommentBoard: (boardId) => api.get(`/api/board/recommend/${boardId}`),

    createComment: (boardId, content) => api.post(`/api/comment/${boardId}`),
    getCommentsByBoard: (boardId) => api.get(`/api/comment/${boardId}`),
    deleteComment: (commentId) => api.delete(`/api/comment/${commentId}`),
    recommendComment: (commentId) => api.get(`/api/comment/recommend/${commentId}`),

    // 실시간 토론방
};
