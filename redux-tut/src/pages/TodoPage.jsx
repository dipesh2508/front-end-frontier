import TodoList from '@/components/TodoList'
import React from 'react'

const TodoPage = () => {
  return (
    <div className='flex items-center justify-center flex-col h-screen gap-8 bg-purple-50'>
        <h1 className='text-4xl font-semibold text-purple-800'>To-Do list using Redux</h1>
        <TodoList />
        </div>
  )
}

export default TodoPage