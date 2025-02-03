import { GripVertical, Trash } from 'lucide-react'
import { Reorder } from 'motion/react'
import { useState } from 'react'
import { Experiment } from '../../components/experiment'

type Todo = {
  id: string
  value: string
}

function Form({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [inputValue, setInputValue] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!inputValue) return

    onSubmit(inputValue)
    setInputValue('')
  }

  return (
    <form
      className="flex w-full items-center gap-2 lg:gap-4"
      onSubmit={handleSubmit}
    >
      <label htmlFor="todo-input" className="sr-only">
        Todo item
      </label>
      <input
        type="text"
        id="todo-input"
        className="border-primary-300 focus:ring-accent-500 text-primary-900 placeholder:text-primary-700 w-full flex-1 rounded-xl border-2 p-2 text-sm focus:ring-2 focus:outline-none lg:p-2.5 lg:text-base"
        placeholder="Add a todo item"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button className="bg-accent-500 text-primary-300 shadow-accent-400 cursor-pointer rounded-xl px-3 py-2 text-sm font-bold shadow-sm lg:px-4 lg:py-2.5 lg:text-base">
        Add
      </button>
    </form>
  )
}

function TodoItem({
  todo,
  onDelete,
}: {
  todo: Todo
  onDelete: (id: string) => void
}) {
  return (
    <Reorder.Item
      value={todo}
      className="bg-primary-200 border-primary-300 flex w-full items-center justify-between rounded-xl border-2 px-2.5 py-2"
    >
      <div className="flex items-center gap-2">
        <div className="cursor-grab">
          <GripVertical className="text-primary-700 size-5" />
        </div>

        <span className="text-primary-800 text-sm lg:text-lg">
          {todo.value}
        </span>
      </div>
      <button
        className="bg-primary-300 hover:bg-primary-400 border-primary-400 cursor-pointer rounded-lg border-2 p-2 duration-100 ease-out"
        aria-label={`delete ${todo.value}`}
        onClick={() => onDelete(todo.id)}
      >
        <Trash className="text-primary-700 size-4 lg:size-5" />
      </button>
    </Reorder.Item>
  )
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
