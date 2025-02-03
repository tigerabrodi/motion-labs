import { Pause, Play } from 'lucide-react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { useEffect, useState } from 'react'
import { Experiment } from '../../components/experiment'
import './styles.css'
import ProfileImg from './tiger-pfp.jpeg'

export type Todo = {
  id: string
  value: string
}

export function VoiceMessagePlayExperiment() {
  const [isPlaying, setIsPlaying] = useState(false)
  // 1:59 in seconds
  const [time, setTime] = useState(119)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    let interval: number | null = null

    if (isPlaying && time > 0) {
      // This is the interval that will decrement the time by 1 second
      interval = setInterval(() => {
        setTime((prev) => Math.max(0, prev - 1))
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, time])

  const formatTime = (seconds: number) => {
    if (seconds === 0) {
      setIsPlaying(false)
      setIsExpanded(false)
      return
    }

    const minutes = Math.floor(seconds / 60)
    const secondsLeft = seconds % 60
    // We do padStart to ensure that the seconds are always 2 digits
    // For example, 1:05 is 1:05, not 1:5
    // If two digits, we're good, no zeroes will be added
    return `${minutes}:${secondsLeft.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    const isNewPlayingState = !isPlaying
    setIsPlaying(isNewPlayingState)
    setIsExpanded(isNewPlayingState)
  }

  return (
    <Experiment>
      <Experiment.Heading>Voice Message Play</Experiment.Heading>
      <Experiment.Body>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <MotionConfig
            transition={{
              type: 'spring',
              bounce: 0.3,
              duration: 0.5,
            }}
          >
            <motion.div
              layout
              className="overflow-hidden"
              style={{
                borderRadius: '999px',
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
              }}
            >
              <div className="flex items-center gap-4 p-2">
                <motion.div className="relative" layout>
                  <AnimatePresence mode="popLayout">
                    {isPlaying && (
                      <MotionConfig transition={{ delay: 0.1 }}>
                        <motion.div
                          className="pulse-ring"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                        <motion.div
                          className="pulse-ring"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                        <motion.div
                          className="pulse-ring"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      </MotionConfig>
                    )}
                  </AnimatePresence>
                  <motion.img
                    src={ProfileImg}
                    alt="Profile"
                    className="relative z-10 size-12 rounded-full object-cover"
                    layout="position"
                  />
                </motion.div>

                <AnimatePresence mode="popLayout">
                  {isExpanded && (
                    <motion.div
                      className="mr-2 flex items-center gap-2"
                      key="expanded"
                    >
                      <motion.button
                        onClick={togglePlay}
                        className="text-primary-100 hover:text-primary-200"
                        layoutId="play-button"
                      >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                      </motion.button>

                      <motion.span
                        className="text-primary-100 font-medium tabular-nums"
                        initial={{ opacity: 0, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{
                          opacity: 0,
                          filter: 'blur(5px)',
                        }}
                      >
                        -{formatTime(time)}
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isExpanded && (
                  <motion.button
                    onClick={togglePlay}
                    className="text-primary-100 hover:text-primary-200 mr-2"
                    aria-label="Play"
                    layoutId="play-button"
                    key="collapsed"
                  >
                    <Play size={24} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </MotionConfig>
        </div>
      </Experiment.Body>
    </Experiment>
  )
}
