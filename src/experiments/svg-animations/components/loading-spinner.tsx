import { motion } from 'motion/react'

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <motion.svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        className="text-primary-200"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0.2, pathOffset: 0 }}
          animate={{
            pathLength: 0.8,
            pathOffset: 0.8,
            transition: {
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        />
      </motion.svg>
    </div>
  )
}
