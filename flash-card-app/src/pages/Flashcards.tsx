import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiUrl } from '@/lib/constants';
interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

const Flashcards: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/topics/${topicId}/flashcards`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFlashcards(response.data);
      } catch (error:any) {
        console.error(error.response.data);
      }
    };

    fetchFlashcards();
  }, [topicId]);

  const handleCreateFlashcard = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${apiUrl}/topics/${topicId}/flashcards`,
        { question, answer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFlashcards([...flashcards, response.data]);
      setQuestion('');
      setAnswer('');
    } catch (error:any) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Flashcards</h2>
      <div className="mb-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2 w-full"
          placeholder="Question"
        />
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2 w-full"
          placeholder="Answer"
        />
        <button
          onClick={handleCreateFlashcard}
          className="p-2 bg-blue-500 text-white rounded w-full"
        >
          Add Flashcard
        </button>
      </div>
      <ul>
        {flashcards.map((flashcard) => (
          <li key={flashcard.id} className="mb-4">
            <p><strong>Question:</strong> {flashcard.question}</p>
            <p><strong>Answer:</strong> {flashcard.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flashcards;
