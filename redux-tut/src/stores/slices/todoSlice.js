import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

// Async Thunk
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data.slice(0, 10);
});

// Slice
const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
      addTodo: (state, action) => {
        state.todos.push(action.payload);
      },
      removeTodo: (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTodos.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.todos = action.payload;
        })
        .addCase(fetchTodos.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    }
  });
  
  // Actions and Reducer
  export const { addTodo, removeTodo } = todosSlice.actions;
  export default todosSlice.reducer;
