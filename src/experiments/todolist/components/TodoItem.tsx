import { GripVertical, Trash } from 'lucide-react'
import { Reorder, useDragControls } from 'motion/react'
import { Todo } from '..'

export function TodoItem({
  todo,
  onDelete,
}: {
  todo: Todo
  onDelete: (id: string) => void
}) {
  const controls = useDragControls()

  return (
    <Reorder.Item
      value={todo}
      dragControls={controls}
      dragListener={false}
      className="bg-primary-200 border-primary-300 flex w-full items-center justify-between rounded-xl border-2 px-2.5 py-2"
    >
      <div className="flex items-center gap-2">
        <div className="cursor-grab" onPointerDown={(e) => controls.start(e)}>
          <GripVertical className="text-primary-700 size-5" />
        </div>

        <span className="text-primary-800 text-sm select-none lg:text-lg">
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
