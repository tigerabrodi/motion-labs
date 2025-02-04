import type { MotionValue } from 'motion/react'

import { AnimatePresence, motion, useSpring, useTransform } from 'motion/react'
import { useEffect } from 'react'
import { cn } from '../../../lib/utils'

// These control the size of each digit displayed
const DIGIT_FONT_SIZE = 56
const DIGIT_PADDING_Y = 10
const DIGIT_PADDING_X = 26
const DIGIT_HEIGHT = DIGIT_FONT_SIZE + DIGIT_PADDING_Y

// We work with digits 0-9
const TOTAL_DIGIT_POSITIONS = 10

// If we need to move more than 5 positions down,
// it's shorter to move up instead
const MOVEMENT_THRESHOLD = 5

type CounterProps = {
  value: number // The full number to display (e.g., 234)
  digitCssAnimationClassName?: string
}

export function Counter({ value, digitCssAnimationClassName }: CounterProps) {
  // Convert number to string to get number of digits
  const valueStr = value.toString()
  const numberOfDigits = valueStr.length

  // Create array of place values (e.g. for 234: [100, 10, 1])
  const places = Array.from({ length: numberOfDigits }, (_, index) => {
    // numberOfDigits - 1 - index because we want to start from the highest place
    // e.g. for 234:
    // first iteration: Math.pow(10, 3-1-0) -> 10^2 = 100
    // second iteration: Math.pow(10, 3-1-1) -> 10^1 = 10
    // third iteration: Math.pow(10, 3-1-2) -> 10^0 = 1
    return Math.pow(10, numberOfDigits - 1 - index)
  })

  return (
    <motion.div
      className="flex gap-3 overflow-hidden p-2 leading-none text-gray-900"
      style={{ fontSize: DIGIT_FONT_SIZE }}
      layout
    >
      <AnimatePresence mode="popLayout">
        {places.map((place) => (
          <motion.div
            key={place}
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                type: 'spring',
                bounce: 0.2,
                duration: 0.3,
                delay: 0.1, // Slight stagger
              },
            }}
            exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          >
            <Digit
              place={place}
              value={value}
              digitCssAnimationClassName={digitCssAnimationClassName}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

type DigitProps = {
  place: number // Place value (100, 10, or 1)
  value: number // Full number (e.g., 234)
  digitCssAnimationClassName?: string
}

function Digit({ place, value, digitCssAnimationClassName }: DigitProps) {
  // Extract the digit for this place value
  // Examples for value = 234:
  // place = 100: 234/100 = 2.34 → Math.floor → 2 → 2 % 10 → 2
  // place = 10:  234/10 = 23.4 → Math.floor → 23 → 23 % 10 → 3
  // place = 1:   234/1 = 234 → Math.floor → 234 → 234 % 10 → 4
  // % is something we do inside the transform function (look at the Number component)
  const extractedDigit = Math.floor(value / place)

  // Create smooth spring animation starting at this digit
  // For 234, this would be either:
  // Place 100: 2
  // Place 10: 23
  // Place 1: 234
  const animatedValue = useSpring(extractedDigit, {
    damping: 23,
    stiffness: 300,
  })

  // Update spring animation whenever the digit changes
  useEffect(() => {
    animatedValue.set(extractedDigit)
  }, [animatedValue, extractedDigit])

  return (
    <motion.div
      style={{
        height: DIGIT_HEIGHT,
        padding: `${DIGIT_PADDING_Y}px ${DIGIT_PADDING_X}px`,
      }}
      className={cn(
        'relative w-[1ch] rounded-xl tabular-nums',
        digitCssAnimationClassName
      )}
      layout="position"
    >
      {/* Create stack of all possible digits (0-9) */}
      {/* They'll move up/down to show correct digit */}
      {[...Array(TOTAL_DIGIT_POSITIONS).keys()].map((digit) => (
        <Number
          key={digit}
          currentAnimatedValue={animatedValue} // Spring animation controlling movement
          digit={digit} // Which digit this element shows (0-9)
        />
      ))}
    </motion.div>
  )
}

type NumberProps = {
  currentAnimatedValue: MotionValue // Spring animation controlling position
  digit: number // The digit this element shows (0-9)
}

function Number({ currentAnimatedValue, digit }: NumberProps) {
  const yPosition = useTransform(currentAnimatedValue, (currentValue) => {
    const newDigit = currentValue % TOTAL_DIGIT_POSITIONS

    // Calculate how many positions we need to move down
    let downwardOffset: number
    if (newDigit > digit) {
      // Moving forward (like 1 to 9)
      // 9 would be new digit which is greater than 1 for example
      downwardOffset = newDigit - digit
    } else {
      // Moving backward (like 9 to 1)
      // we're at 9, but moving to 1
      // we add total digit positions (10) - digit (9) + new digit (1)
      // we add it because we're moving down and wanna see how many positions to move down
      // 10 - 9 + 1 = 2
      // if you're at 9, you only need to go down once to 0, and then once more to 1
      // so 2 positions
      downwardOffset = TOTAL_DIGIT_POSITIONS - digit + newDigit
    }

    // If we need to move more than 5 positions down,
    // it's shorter to move UP instead
    const shouldMoveUpInsteadOfDown = downwardOffset > MOVEMENT_THRESHOLD
    if (shouldMoveUpInsteadOfDown) {
      // We know that upward offset is total digit positions - downward offset
      // because upward offset + downward offset = total digit positions
      const upwardOffset = TOTAL_DIGIT_POSITIONS - downwardOffset

      // y needs to be minus because we're moving up
      return -(upwardOffset * DIGIT_HEIGHT)
    }

    return downwardOffset * DIGIT_HEIGHT
  })

  return (
    <motion.span
      style={{ y: yPosition }}
      className="text-primary-100 absolute inset-0 flex items-center justify-center select-none"
    >
      {digit}
    </motion.span>
  )
}
