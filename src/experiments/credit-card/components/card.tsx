import { motion } from 'motion/react'

export function Card({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      layoutId="credit-card"
      className="relative flex aspect-video flex-shrink flex-grow-0 basis-[160px] flex-col justify-between overflow-hidden rounded-lg bg-blue-600 p-3"
    >
      {/* Header with name */}
      <motion.span
        className="text-white"
        layoutId="card-header-name"
        layout="position"
      >
        Tiger Abrodi
      </motion.span>

      <motion.span
        className="absolute top-3 right-3 z-10 rounded-full bg-gray-200 px-2 py-1 text-xs text-blue-600"
        layoutId="card-header-virtual"
      >
        Virtual
      </motion.span>

      {/* Card number */}
      <div className="flex items-center gap-1">
        <span className="text-xs text-white">••</span>
        <motion.span
          className="text-sm text-white"
          layoutId="card-number"
          layout="position"
          transition={{ duration: 0.2, type: 'tween' }}
          exit={{
            filter: 'blur(10px)',
          }}
        >
          4444
        </motion.span>
      </div>

      <motion.div
        className="absolute right-3 bottom-3 h-12 w-20"
        layoutId="credit-card-details-icon"
      >
        <div className="absolute left-8 size-12 rounded-full bg-amber-400 opacity-90"></div>
        <div className="absolute left-0 size-12 rounded-full bg-red-500 opacity-90"></div>
      </motion.div>
    </motion.button>
  )
}
