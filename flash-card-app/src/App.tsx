import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Topics from './pages/Topics';
import Flashcards from './pages/Flashcards';

const App: React.FC = () => {
  return ( 
    <div className='bg-slate-100 min-h-screen'>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Topics />} />
        <Route path="/topics/:topicId/flashcards" element={<Flashcards />} />
      </Routes>
    </div>
  );
};

export default App;
