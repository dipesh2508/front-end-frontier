import React, { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import "@/App.css";

interface ITopicCard {
  question: string;
  answer: string;
}

const FlashCard: React.FC<ITopicCard> = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };
  return (
    <div className="perspective">
      <div
        className={cn(
          `relative w-64 h-64 transition-transform duration-500 transform-style-preserve`,
          flipped && "rotate-y-180"
        )}
        onClick={handleClick}
      >
        <Card className="absolute inset-0 flex justify-center items-center backface-hidden">
          <CardHeader>
            <CardTitle className="text-center">{question}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="absolute inset-0 flex justify-center items-center backface-hidden rotate-y-180">
          <CardDescription className="text-center text-lg text-slate-900">
            {answer}
          </CardDescription>
        </Card>
      </div>
    </div>
  );
};

export default FlashCard;
