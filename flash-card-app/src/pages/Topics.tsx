import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Topic {
  id: number;
  title: string;
}

const Topics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/topics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTopics(response.data);
      } catch (error:any) {
        console.error(error.response.data);
      }
    };

    fetchTopics();
  }, []);

  const handleCreateTopic = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/topics',
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTopics([...topics, response.data]);
      setTitle('');
    } catch (error:any) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Topics</h2>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2 w-full"
          placeholder="New Topic"
        />
        <button
          onClick={handleCreateTopic}
          className="p-2 bg-blue-500 text-white rounded w-full"
        >
          Add Topic
        </button>
      </div>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id} className="mb-2">
            <Link to={`/topics/${topic.id}`} className="text-blue-500">
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;
