import { lazy } from 'react';

const RoomList = lazy(() => import('../../pages/chats/RoomList'));
const Login = lazy(() => import('../../pages/users/Login'));
const Signup = lazy(() => import('../../pages/users/Signup'));
const Home = lazy(() => import('../../pages/Home'));
const SearchBoard = lazy(() => import('../../pages/boards/SearchBoard'));
const LiveRoom = lazy(() =>
  import('../../pages/chats/views/LiveRoom/LiveRoom'),
);

export { RoomList, Login, Signup, Home, SearchBoard, LiveRoom };
