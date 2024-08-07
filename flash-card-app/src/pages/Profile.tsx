import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/shared/NavBar';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

interface Topic {
  id: number;
  title: string;
  userId: number;
  flashcards: Flashcard[];
}

interface UserProfile {
  id: number;
  email: string;
  name: string;
  topics: Topic[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: 0,
    email: '',
    name: '',
    topics: [],
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if(!token) {
        navigate('/login');
      }
      const response = await axios.get(`${apiUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
    } catch (error:any) {
      console.error(error.response.data);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) 
    return <div>Loading...</div>
  else
  return (
<>
      <NavBar />
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <div className="mb-4">
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Name:</strong> {profile.name}</p>
      </div>
      <h3 className="text-xl font-bold mb-4">Topics</h3>
      <ul>
        {profile.topics.map((topic) => (
          <li key={topic.id} className="mb-2">
            <p><strong>Title:</strong> {topic.title}</p>
            <ul>
              {topic?.flashcards?.map((flashcard) => (
                <li key={flashcard.id} className="ml-4">
                  <p><strong>Question:</strong> {flashcard.question}</p>
                  <p><strong>Answer:</strong> {flashcard.answer}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Profile;
