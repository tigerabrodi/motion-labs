import { Minus, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { Experiment } from '../../components/experiment'
import { Counter } from './components/counter'

export function CounterExperiment() {
  const [count, setCount] = useState(0)

  return (
    <Experiment>
      <Experiment.Heading>Counter</Experiment.Heading>
      <Experiment.Body>
        <motion.div
          className="flex min-h-full w-full items-center justify-center gap-4 p-4 lg:px-12 lg:py-8"
          layout
        >
          <motion.button
            onClick={() => setCount(count - 1)}
            className="rounded-lg p-2"
          >
            <Minus size={28} className="text-primary-100" />
          </motion.button>
          <Counter value={count} />
          <motion.button
            onClick={() => setCount(count + 1)}
            className="rounded-lg p-2"
          >
            <Plus size={28} className="text-primary-100" />
          </motion.button>
        </motion.div>
      </Experiment.Body>
    </Experiment>
  )
}
