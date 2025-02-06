import { Reorder } from 'motion/react'
import { useState } from 'react'
import { Experiment } from '../../components/experiment'
import { Form } from './components/form'
import { TodoItem } from './components/todo-item'

export type Todo = {
  id: string
  value: string
}

export function TodolistExperiment() {
  const [todos, setTodos] = useState<Array<Todo>>([])

  const handleSubmit = (value: string) => {
    setTodos([...todos, { id: crypto.randomUUID(), value }])
  }

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <Experiment>
      <Experiment.Heading>Todolist</Experiment.Heading>
      <Experiment.Body>
        <div className="flex min-h-full w-full flex-col items-center gap-4 p-4 lg:px-12 lg:py-8">
          <Form onSubmit={handleSubmit} />
          <Reorder.Group
            axis="y"
            values={todos}
            onReorder={setTodos}
            className="flex w-full flex-col gap-2"
          >
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
            ))}
          </Reorder.Group>
        </div>
      </Experiment.Body>
    </Experiment>
  )
}
