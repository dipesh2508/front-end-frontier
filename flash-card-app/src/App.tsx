import React from 'react';
import { Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Topics from './pages/Topics';
import Flashcards from './pages/Flashcards';
import { Button } from './components/ui/button';

const App: React.FC = () => {
  const navigate = useNavigate();
  return ( 
    <div className="p-4">
      <nav className="mb-4">
        <Link to="/register" className="mr-4">Register</Link>
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/profile" className="mr-4">Profile</Link>
        <Link to="/" className="mr-4">Topics</Link>

        <Button onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }
        }>
          Logout
        </Button>
      </nav>
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topicId/flashcards" element={<Flashcards />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
