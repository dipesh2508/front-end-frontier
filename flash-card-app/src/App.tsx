import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Topics from './pages/Topics';
import Flashcards from './pages/Flashcards';

const App: React.FC = () => {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/register" className="mr-4">Register</Link>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/profile" className="mr-4">Profile</Link>
          <Link to="/topics" className="mr-4">Topics</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topicId/flashcards" element={<Flashcards />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
