import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { useState } from 'react'
import { Experiment } from '../../components/experiment'
import { cn } from '../../lib/utils'
import FirstImg from './assets/1.png'
import SecondImg from './assets/2.png'
import ThirdImg from './assets/3.png'

type Step = 1 | 2 | 3

const STEPS = [1, 2, 3] as const

type Direction = 'forwards' | 'backwards'

const formVariants = {
  initial: (direction: Direction) => ({
    opacity: 0,
    // How should it come in?
    // If we're moving forwards, it should come in from the right
    // If we're moving backwards, it should come in from the left
    x: direction === 'forwards' ? '100%' : '-100%',
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: Direction) => ({
    opacity: 0,
    // When exiting, where are we going?
    // If we're going forwards, the current step should move backwards and be hidden
    // If we're going backwards, it means the current step should animate out through the right side
    x: direction === 'forwards' ? '-100%' : '100%',
  }),
}

// For prototype/demo purposes we're using a single component
// In a real application, you'd likely want to split these into separate components
// for better maintenance and testing. Example structure:
//
// src/
//   components/
//     multi-step-form/
//       steps/
//         Step1.tsx
//         Step2.tsx
//         Step3.tsx
//         index.ts
//       MultiStepForm.tsx
function StepContent({ step }: { step: Step }) {
  switch (step) {
    case 1:
      return (
        <img
          src={FirstImg}
          className="max-h-24 w-32 object-contain lg:max-h-32"
          alt="Step 1"
        />
      )
    case 2:
      return (
        <img
          src={SecondImg}
          className="max-h-24 w-32 object-contain lg:max-h-32"
          alt="Step 2"
        />
      )
    case 3:
      return (
        <img
          src={ThirdImg}
          className="max-h-24 w-32 object-contain lg:max-h-32"
          alt="Step 3"
        />
      )
  }
}

export function MultiStepFormExperiment() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [direction, setDirection] = useState<Direction>('forwards')

  // You might want to store the form state in a state variable
  // Hence leaving the comment here for future reference
  // Of course this would have more fields
  // You might even want this as some sort of global state if this is a complex multi stpe form (zustand, jotai, etc)
  // const [formState, setFormState] = useState<FormState>({
  //   step1: '',
  //   step2: '',
  //   step3: '',
  // })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>(
    'idle'
  )

  // Simulate submit
  // For the last step
  const handleSubmit = () => {
    if (currentStep !== 3) {
      // Only increment step if we're not on the last step
      setDirection('forwards')
      setCurrentStep((prev) => (prev + 1) as Step)
      return
    }

    // On last step, just handle submission
    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
    }, 2000)

    setTimeout(() => {
      setStatus('idle')
      setCurrentStep(1)
    }, 4000)
  }

  return (
    <Experiment>
      <Experiment.Heading>Multi Step Form</Experiment.Heading>
      <Experiment.Body className="flex items-center justify-center">
        <form
          className="flex w-full flex-col gap-8 px-4 lg:max-w-md lg:gap-20 lg:px-0"
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit()
          }}
        >
          {/* Progress Bar */}
          <div className="relative">
            {/* The line */}
            <div className="bg-primary-500 h-1 rounded">
              <motion.div
                className="bg-accent-500 h-full rounded"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                transition={{ type: 'spring', bounce: 0.2 }}
              />
            </div>

            {/* The steps */}
            <div className="absolute -top-3 flex w-full justify-between">
              {STEPS.map((step) => (
                <motion.div
                  key={step}
                  className={cn(
                    'flex size-9 items-center justify-center rounded-full text-sm',
                    {
                      'bg-accent-500': step <= currentStep,
                      'bg-primary-500': step > currentStep,
                    }
                  )}
                  initial={{
                    scale: 1,
                  }}
                  animate={{
                    scale: step === currentStep ? 1.2 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    bounce: 0.6,
                    duration: 0.5,
                  }}
                >
                  {step}
                </motion.div>
              ))}
            </div>
          </div>

          <MotionConfig
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          >
            <div className="relative overflow-hidden">
              <AnimatePresence
                initial={false}
                mode="popLayout"
                custom={direction}
              >
                <motion.div
                  key={currentStep}
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={direction}
                  className="bg-primary-800 flex h-32 items-center justify-center rounded-lg"
                  transition={{
                    type: 'spring',
                    damping: 26,
                    stiffness: 240,
                    duration: 0.5,
                  }}
                >
                  <StepContent step={currentStep} />
                </motion.div>
              </AnimatePresence>
            </div>
          </MotionConfig>

          {/* Actions */}
          <div className="flex justify-between">
            <motion.button
              className="bg-primary-100 rounded px-4 py-2"
              disabled={currentStep === 1}
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setDirection('backwards')
                setCurrentStep((prev) => (prev - 1) as Step)
              }}
            >
              Back
            </motion.button>

            <motion.button
              className="bg-accent-500 relative overflow-hidden rounded px-4 py-2"
              type="submit"
              disabled={status === 'submitting'}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.2 }}
              layout
            >
              {status === 'submitting'
                ? 'Submitting...'
                : status === 'success'
                  ? 'Success'
                  : 'Next'}
            </motion.button>
          </div>
        </form>
      </Experiment.Body>
    </Experiment>
  )
}
