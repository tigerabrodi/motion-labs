import { CheckIcon, CopyIcon } from 'lucide-react'
import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react'
import { RefObject, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

function CardDetailInfo({
  label,
  value,
  ...motionProps
}: HTMLMotionProps<'span'> & {
  label: string
  value: string
}) {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
    >
      <span className="text-xs font-light text-white">{label}</span>
      <motion.span
        className="text-sm font-medium text-white lg:text-base lg:font-semibold"
        {...motionProps}
      >
        {value}
      </motion.span>
    </motion.div>
  )
}

function CopyButton({
  value,
  ariaLabel,
}: {
  value: string
  ariaLabel: string
}) {
  const [isCopied, setIsCopied] = useState(false)

  function onClick() {
    void navigator.clipboard.writeText(value)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2500)
  }

  return (
    <motion.button
      aria-label={ariaLabel}
      className="pb-1 text-white lg:pb-1.5"
      onClick={onClick}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
    >
      <AnimatePresence mode="popLayout">
        {isCopied ? (
          <motion.span
            initial={{ scale: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            exit={{ scale: 0, filter: 'blur(10px)' }}
            key="copied"
            transition={{
              duration: 0.3,
            }}
            style={{
              width: 20,
              height: 20,
            }}
          >
            <CheckIcon className="size-4" />
          </motion.span>
        ) : (
          <motion.span
            initial={{ scale: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            exit={{ scale: 0, filter: 'blur(10px)' }}
            transition={{
              duration: 0.3,
            }}
            key="copy"
            style={{
              width: 20,
              height: 20,
            }}
          >
            <CopyIcon className="size-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export function CardDetails({
  onClickOutside,
}: {
  onClickOutside: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref as RefObject<HTMLElement>, onClickOutside)

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-20 flex aspect-video h-[180px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-lg bg-blue-600 p-4 lg:h-[300px]"
      ref={ref}
      layoutId="credit-card"
    >
      <motion.span
        className="text-white"
        layoutId="card-header-name"
        layout="position"
      >
        Tiger Abrodi
      </motion.span>

      <motion.span
        className="absolute top-4 right-4 rounded-full bg-gray-200 px-2 py-1 text-sm text-blue-600"
        layoutId="card-header-virtual"
      >
        Virtual
      </motion.span>

      <div className="flex w-full flex-col gap-4 lg:gap-8">
        {/* Card number with its copy button */}
        <div className="flex items-end gap-5 lg:gap-8">
          {/* Card number */}
          <CardDetailInfo
            label="Card number"
            value="4444 4444 4444 4444"
            layoutId="card-number"
            transition={{ duration: 0.2, type: 'tween' }}
          />

          {/* Copy button */}
          <CopyButton
            value="4444 4444 4444 4444"
            ariaLabel="Copy card number"
          />
        </div>

        {/* Card number with its copy button */}
        <div className="flex items-end gap-5 lg:gap-8">
          {/* Expiry date */}
          <CardDetailInfo label="Expiry date" value="02/30" />

          {/* CVV */}
          <CardDetailInfo label="CVV" value="444" />

          {/* Copy button */}
          <CopyButton value="444" ariaLabel="Copy CVV" />
        </div>
      </div>

      <motion.div
        className="absolute right-4 bottom-4 h-12 w-20 lg:h-16 lg:w-24"
        layoutId="credit-card-details-icon"
      >
        <div className="absolute left-8 size-12 rounded-full bg-amber-400 opacity-90 lg:size-16"></div>
        <div className="absolute left-0 size-12 rounded-full bg-red-500 opacity-90 lg:size-16"></div>
      </motion.div>
    </motion.div>
  )
}
