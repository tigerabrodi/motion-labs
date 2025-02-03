import { useState } from 'react'

export function Form({ onSubmit }: { onSubmit: (value: string) => void }) {
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
