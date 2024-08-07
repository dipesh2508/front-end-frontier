import React from 'react'
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
import { Input } from "@/components/ui/input"
import axios from 'axios';
import { apiUrl } from '@/lib/constants';

const schema = z.object({
    title: z.string().min(1, "Title is required"),
});

interface ITopic {
    topics: any;
    setTopics: any;
}

const TopicForm:React.FC<ITopic> = ({topics, setTopics}) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
          title: "",
        },
      })

    const { reset } = form;

    const onSubmit = async (data:any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
              `${apiUrl}/topics`,
              { title: data.title },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setTopics([...topics, response.data]);

            reset();
          } catch (error:any) {
            console.error(error.response.data);
          }
    }

  return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the topic name here" {...field} />
              </FormControl>
              <FormDescription>
                Create a new topic to organize your flashcards.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default TopicForm