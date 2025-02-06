import { motion } from 'motion/react'
import { useState } from 'react'

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center justify-center p-4">
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        onClick={() => setIsOpen(!isOpen)}
        className="text-primary-200 cursor-pointer"
      >
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={false}
          animate={isOpen ? { d: 'M 10 10 L 30 30' } : { d: 'M 10 15 L 30 15' }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={false}
          animate={
            isOpen
              ? { d: 'M 10 30 L 30 10', opacity: 1 }
              : { d: 'M 10 25 L 30 25', opacity: 1 }
          }
          transition={{ duration: 0.3 }}
        />
      </motion.svg>
    </div>
  )
}
