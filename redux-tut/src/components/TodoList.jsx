import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, removeTodo } from "@/stores/slices/todoSlice";
import { Button } from "./ui/button";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const todo = {
      id: todos.length + 1,
      title: newTodo,
    };
    dispatch(addTodo(todo));
    setNewTodo("");
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <>
      <form
        onSubmit={handleAddTodo}
        className="flex flex-row gap-4 items-center"
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="border border-slate-400 rounded-2xl px-4 py-3"
        />
        <Button type="submit">Add Todo</Button>
      </form>
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex justify-between gap-10">
            <div className="text-left flex items-center gap-3">
              <FaArrowRightLong />
              {todo.title}
            </div>
            <Button
              onClick={() => handleRemoveTodo(todo.id)}
              variant={"destructive"}
              size={"sm"}
            >
              <FaXmark />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
