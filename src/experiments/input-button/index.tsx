import { Check, Loader2, SendHorizonalIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Experiment } from '../../components/experiment'

type Status = 'idle' | 'editing' | 'submitting' | 'success'

const buttonContents: Record<Status, { key: string; icon: React.ReactNode }> = {
  idle: {
    key: 'send',
    icon: <SendHorizonalIcon size={20} />,
  },
  editing: {
    key: 'send',
    icon: <SendHorizonalIcon size={20} />,
  },
  submitting: {
    key: 'submitting',
    icon: <Loader2 size={20} className="animate-spin" />,
  },
  success: {
    key: 'success',
    icon: <Check size={20} />,
  },
}

export function InputButtonExperiment() {
  const [status, setStatus] = useState<Status>('idle')

  const isIdle = status === 'idle'
  const isEditing = status === 'editing'
  const isSubmitting = status === 'submitting'

  return (
    <Experiment>
      <Experiment.Heading>Input Button</Experiment.Heading>
      <Experiment.Body className="flex items-center justify-center">
        <motion.form
          className="flex items-center gap-1.5 overflow-hidden"
          layout
          onSubmit={(event) => {
            event.preventDefault()

            if (isIdle) {
              setStatus('editing')
            } else if (isEditing) {
              setStatus('submitting')
              setTimeout(() => {
                setStatus('success')
              }, 2000)

              setTimeout(() => {
                setStatus('idle')
              }, 4000)
            }
          }}
        >
          <label htmlFor="input" className="sr-only">
            enter text
          </label>

          <AnimatePresence mode="popLayout">
            {(isEditing || isSubmitting) && (
              <motion.input
                placeholder="Enter text"
                id="input"
                className="bg-primary-100 text-primary-800 placeholder:text-primary-200 border-primary-400 rounded-2xl border-2 px-1.5 py-1 outline-none"
                autoFocus
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{
                  opacity: 1,
                  filter: 'blur(0px)',
                }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
              />
            )}
          </AnimatePresence>

          <motion.button
            className="bg-primary-100 text-primary-600 border-primary-400 relative overflow-hidden rounded-full border-2 p-1.5"
            aria-label="submit"
            layout="position"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={buttonContents[status].key}
                initial={{ y: -25 }}
                animate={{ y: 0 }}
                exit={{ y: 25 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              >
                {buttonContents[status].icon}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.form>
      </Experiment.Body>
    </Experiment>
  )
}
