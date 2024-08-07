import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { apiUrl } from "@/lib/constants";
import { IFlashcard } from "@/pages/Flashcards";
import { DialogClose } from "../ui/dialog";

const schema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

interface IFC {
  flashcards: IFlashcard[];
  setFlashcards: React.Dispatch<React.SetStateAction<IFlashcard[]>>;
  topicId?: string;
}

const TopicForm: React.FC<IFC> = ({ flashcards, setFlashcards, topicId }) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const { reset } = form;

  const onSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/topics/${topicId}/flashcards`,
        { question: data.question, answer: data.answer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFlashcards([...flashcards, response.data]);
      reset();
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder="Enter the question here" {...field} />
              </FormControl>
              <FormDescription>
                Enter a question for your flashcard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Input placeholder="Enter the answer here" {...field} />
              </FormControl>
              <FormDescription>
                Create a new topic to organize your flashcards.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button type="submit">Submit</Button>
          <DialogClose asChild>
            <Button variant={"destructive"}>Cancel</Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};

export default TopicForm;
