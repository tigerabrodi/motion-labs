import { CardsExperiment } from '../experiments/cards'
import { CounterExperiment } from '../experiments/counter'
import { CreditCardExperiment } from '../experiments/credit-card'
import { InputButtonExperiment } from '../experiments/input-button'
import { MultiStepFormExperiment } from '../experiments/multi-step-form'
import { SvgAnimationsExperiment } from '../experiments/svg-animations'
import { TabsExperiment } from '../experiments/tabs'
import { TodolistExperiment } from '../experiments/todolist'
import { VoiceMessagePlayExperiment } from '../experiments/voice-message-play'

export function ExperimentsList() {
  return (
    <div className="flex w-full flex-grow flex-col items-center gap-10 p-3 lg:gap-20 lg:py-8">
      <TodolistExperiment />
      <VoiceMessagePlayExperiment />
      <CounterExperiment />
      <CreditCardExperiment />
      <TabsExperiment />
      <InputButtonExperiment />
      <MultiStepFormExperiment />
      <CardsExperiment />
      <SvgAnimationsExperiment />
    </div>
  )
}
