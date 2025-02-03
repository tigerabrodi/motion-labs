import { TodolistExperiment } from '../experiments/todolist'

export function ExperimentsList() {
  return (
    <div className="flex w-full flex-grow flex-col items-center gap-12 p-3 lg:p-0">
      <TodolistExperiment />
    </div>
  )
}
