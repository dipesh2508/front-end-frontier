import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiUrl } from "@/lib/constants";
import NavBar from "@/components/shared/NavBar";
import FlashCard from "@/components/FlashCard";
import FlashCardForm from "@/components/forms/FlashCardForm";

export interface IFlashcard {
  id: number;
  question: string;
  answer: string;
}

const Flashcards: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${apiUrl}/topics/${topicId}/flashcards`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFlashcards(response.data);
      } catch (error: any) {
        console.error(error.response.data);
      }
    };

    fetchFlashcards();
  }, [topicId]);

  return (
    <>
      <NavBar />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Flashcards</h2>
        <div className="mb-4">
          <FlashCardForm
            flashcards={flashcards}
            setFlashcards={setFlashcards}
            topicId={topicId}
          />
        </div>
        <div className="grid grid-cols-5 gap-4">
          {flashcards.map((flashcard) => (
            <FlashCard
              question={flashcard.question}
              answer={flashcard.answer}
              key={flashcard.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Flashcards;
