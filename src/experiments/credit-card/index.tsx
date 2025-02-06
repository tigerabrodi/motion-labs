import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { useState } from 'react'
import { Experiment } from '../../components/experiment'
import { Card } from './components/card'
import { CardDetails } from './components/card-details'

export function CreditCardExperiment() {
  const [isCardDetailsOpen, setIsCardDetailsOpen] = useState(false)

  return (
    <Experiment>
      <Experiment.Heading>Credit Card</Experiment.Heading>
      <Experiment.Body>
        <div className="relative flex min-h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-4 lg:px-12 lg:py-8">
          <MotionConfig
            transition={{ duration: 0.5, type: 'spring', bounce: 0.175 }}
          >
            <AnimatePresence>
              {isCardDetailsOpen ? (
                <div className="absolute inset-0" key="card-details">
                  <motion.div
                    className="bg-primary-500 absolute inset-0 blur-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                  />
                  <CardDetails
                    onClickOutside={() => setIsCardDetailsOpen(false)}
                  />
                </div>
              ) : (
                <Card onClick={() => setIsCardDetailsOpen(true)} key="card" />
              )}
            </AnimatePresence>
          </MotionConfig>
        </div>
      </Experiment.Body>
    </Experiment>
  )
}
