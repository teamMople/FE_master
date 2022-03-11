import React from 'react';
import '../styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateChatRoom from '../../chatTestDir/CreateChatRoom';
import VoiceRoom from '../../chatTestDir/VoiceRoom';
import ChatRoomList from '../../chatTestDir/ChatRoomList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={'/'} element={<ChatRoomList />} />
          <Route path={'/voice/create'} element={<CreateChatRoom />} />
          <Route path={'/voice/:roomId'} element={<VoiceRoom />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
