import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "@/lib/constants";
import NavBar from "@/components/shared/NavBar";
import TopicCard from "@/components/TopicCard";
import TopicForm from "@/components/forms/TopicForm";

interface Topic {
  id: number;
  title: string;
}

const Topics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        }
        const response = await axios.get(`${apiUrl}/topics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTopics(response.data);
      } catch (error: any) {
        console.error(error.response.data);
      }
    };

    fetchTopics();
    console.log(topics);
  }, []);

  return (
    <>
      <NavBar />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Topics</h2>
        <TopicForm topics={topics} setTopics={setTopics} />
        <ul>
          {topics.map((topic) => (
            <li key={topic.id} className="mb-2">
              <Link
                to={`/topics/${topic.id}/flashcards`}
                className="text-blue-500"
              >
                <TopicCard title={topic.title} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Topics;
