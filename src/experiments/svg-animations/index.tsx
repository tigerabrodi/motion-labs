import { Experiment } from '../../components/experiment'
import { AnimatedCheckbox } from './components/animated-checkbox'

export function SvgAnimationsExperiment() {
  return (
    <Experiment>
      <Experiment.Heading>SVG Animations</Experiment.Heading>
      <Experiment.Body>
        <div className="flex h-full w-full items-start gap-4 p-4 lg:px-12 lg:py-8">
          <AnimatedCheckbox />
        </div>
      </Experiment.Body>
    </Experiment>
  )
}
