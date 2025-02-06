import { Experiment } from '../../components/experiment'
import { AnimatedCheckbox } from './components/animated-checkbox'
import { HamburgerMenu } from './components/hamburger-menu'
import { LoadingSpinner } from './components/loading-spinner'

export function SvgAnimationsExperiment() {
  return (
    <Experiment>
      <Experiment.Heading>SVG Animations</Experiment.Heading>
      <Experiment.Body>
        <div className="flex h-full w-full items-start justify-between gap-4 p-4 lg:px-12 lg:py-8">
          <AnimatedCheckbox />
          <LoadingSpinner />
          <HamburgerMenu />
        </div>
      </Experiment.Body>
    </Experiment>
  )
}
