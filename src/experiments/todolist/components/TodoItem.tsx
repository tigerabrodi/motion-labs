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
      className="bg-primary-800 border-primary-700 flex w-full items-center justify-between rounded-xl border-2 px-2.5 py-2"
    >
      <div className="flex items-center gap-2">
        <div className="cursor-grab" onPointerDown={(e) => controls.start(e)}>
          <GripVertical className="text-primary-100 size-5" />
        </div>

        <span className="text-primary-100 text-sm select-none lg:text-lg">
          {todo.value}
        </span>
      </div>
      <button
        className="bg-primary-700 hover:bg-primary-600 border-primary-700 rounded-lg border-2 p-2 duration-100 ease-out"
        aria-label={`delete ${todo.value}`}
        onClick={() => onDelete(todo.id)}
      >
        <Trash className="text-primary-100 size-4 lg:size-5" />
      </button>
    </Reorder.Item>
  )
}
