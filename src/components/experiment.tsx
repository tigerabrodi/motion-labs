import { ComponentProps } from 'react'
import { cn } from '../lib/utils'

export function Experiment({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex aspect-[2/2] w-full max-w-[900px] flex-col gap-4 lg:aspect-[3/2] lg:gap-8">
      {children}
    </div>
  )
}

function Heading({ children, className }: ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'text-primary-100 font-ninja text-base lg:mx-auto lg:text-2xl',
        className
      )}
    >
      {children}
    </h2>
  )
}

function Body({ children, className }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-primary-800 border-primary-700 experiment-body min-h-0 flex-grow overflow-y-auto rounded-xl border',
        className
      )}
    >
      {children}
    </div>
  )
}

Experiment.Heading = Heading
Experiment.Body = Body
