import { motion } from 'motion/react'
import { ComponentProps, useState } from 'react'
import { cn } from '../../../lib/utils'

// Sample of how to use the component with props
type AnimatedCheckboxProps = ComponentProps<'input'>

// className is in case you wanna style the svg
export const AnimatedCheckbox = ({
  className,
  ...props
}: AnimatedCheckboxProps) => {
  // If you want, you can refactor this to be in the parent component
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="flex items-center justify-center p-4">
      {/* To make it work and accesible, we wrap it all in a label */}
      <label
        className="relative flex cursor-pointer items-center"
        htmlFor="animated-checkbox"
      >
        {/* Real checkbox that's visually hidden but accessible */}
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={(event) => setIsChecked(event.target.checked)}
          aria-checked={isChecked}
          // Typically, these attributes would come from the props
          aria-label="Checkbox"
          role="checkbox"
          name="animated-checkbox"
          id="animated-checkbox"
          {...props}
        />

        {/* Our SVG visual checkbox */}
        <motion.svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          className={cn(className)}
          aria-hidden="true" // Hide from screen readers since we have the real input
        >
          <motion.rect
            x="5"
            y="5"
            width="40"
            height="40"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            initial={false}
            animate={{
              pathLength: 1,
              stroke: isChecked
                ? 'var(--color-primary-200)'
                : 'var(--color-primary-400)',
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.path
            d="M 15 25 L 25 35 L 35 15"
            fill="none"
            stroke="var(--color-primary-200)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isChecked ? 1 : 0,
              opacity: isChecked ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.svg>
      </label>
    </div>
  )
}
