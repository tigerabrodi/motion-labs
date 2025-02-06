import { AnimatePresence, motion } from 'motion/react'
import { RefObject, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { Experiment } from '../../components/experiment'
import AotImg from './assets/aot-wallpaper.jpg'
import BerserkImg from './assets/berserk-1997-wallpaper.avif'
import NarutoImg from './assets/naruto-wallpaper.png'
import SoloLevellingImg from './assets/solo-levelling.png'

type Card = {
  id: string
  image: string
  description: string
}

const CARDS: Array<Card> = [
  {
    id: '1',
    image: NarutoImg,
    description: `A young ninja with dreams of becoming his village's leader discovers he has a powerful fox demon sealed within him. Through determination and the bonds he forms, he works to protect his friends and earn the respect of his village while facing increasingly dangerous threats.`,
  },
  {
    id: '2',
    image: AotImg,
    description: `Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason. The story follows Eren Yeager and his friends as they fight for survival and uncover the dark mysteries of their world.`,
  },
  {
    id: '3',
    image: BerserkImg,
    description: `In a dark medieval fantasy world, a lone mercenary named Guts seeks vengeance against his former ally who sacrificed their comrades for power. The story explores themes of fate, free will, and the depths of human nature through brutal combat and psychological horror.`,
  },
  {
    id: '4',
    image: SoloLevellingImg,
    description: `In a world where hunters must fight dangerous monsters, Sung Jin-Woo starts as the weakest of all hunters. After surviving a brutal dungeon experience, he gains a unique ability to level up and becomes increasingly powerful, working to uncover the secrets behind his newfound strength.`,
  },
]

type CardProps = {
  card: Card
  onClick: (card: Card) => void
}

function CardItem({ card, onClick }: CardProps) {
  return (
    <motion.button
      className="h-full w-full overflow-hidden"
      layoutId={`card-${card.id}`}
      onClick={() => onClick(card)}
      style={{
        borderRadius: '16px',
      }}
      whileHover={{
        scale: 1.05,
        boxShadow:
          '0px 0px 5px 0px black, 0px 0px 10px 0px black, 0px 0px 15px 0px black',
        transition: {
          duration: 0.4,
          type: 'spring',
          bounce: 0.5,
        },
      }}
      whileTap={{
        scale: 1.01,
        boxShadow: '0px 0px 4px 0px black, 0px 0px 7px 0px black',
        transition: {
          duration: 0.4,
          type: 'spring',
          bounce: 0.5,
        },
      }}
    >
      <motion.img
        src={card.image}
        alt={card.description}
        className="size-full object-cover object-center"
        layoutId={`card-image-${card.id}`}
        style={{
          borderRadius: '16px',
        }}
      />
    </motion.button>
  )
}

/**
 * Cards
 *
 * The key thing to make this work nicely is to connect the elements via layoutId which is global.
 *
 * Docs: https://motion.dev/docs/react-layout-animations
 *
 */
export function CardsExperiment() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const selectedCardRef = useRef<HTMLDivElement>(null)

  function handleCardClick(card: Card) {
    setSelectedCard(card)
  }

  useOnClickOutside(selectedCardRef as RefObject<HTMLElement>, () =>
    setSelectedCard(null)
  )

  return (
    <Experiment>
      <Experiment.Heading>Cards</Experiment.Heading>
      <Experiment.Body>
        <div className="relative flex h-full w-full items-center justify-center p-4">
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4">
            {CARDS.map((card) => (
              <CardItem key={card.id} card={card} onClick={handleCardClick} />
            ))}
          </div>

          <AnimatePresence>
            {selectedCard && (
              <motion.div className="absolute inset-0" key={selectedCard.id}>
                {/* background blur */}
                <motion.div
                  className="bg-primary-500 absolute inset-0 blur-md"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 0.7,
                    transition: { duration: 0.2 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.1,
                    },
                  }}
                />

                <motion.div
                  className="absolute top-1/2 left-1/2 flex w-[60%] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden lg:w-auto"
                  layoutId={`card-${selectedCard.id}`}
                  style={{
                    borderRadius: '16px',
                    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',
                  }}
                  exit={{
                    transition: {
                      duration: 0.1,
                    },
                  }}
                  ref={selectedCardRef}
                >
                  <motion.img
                    src={selectedCard.image}
                    alt={selectedCard.description}
                    className="w-full object-cover object-center"
                    layoutId={`card-image-${selectedCard.id}`}
                    style={{
                      borderRadius: '16px',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  />

                  <motion.div
                    className="bg-primary-600 p-2 text-center lg:p-4"
                    initial={{ opacity: 0, scaleY: 0, y: -15 }}
                    layout
                    style={{
                      // Not quite working as I wished
                      // Aniamting height instead of scaleY does a better job but causes flickering
                      originY: 0,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scaleY: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scaleY: 0,
                      transition: { duration: 0.1 },
                    }}
                  >
                    <p className="text-primary-100 line-clamp-6 font-mono text-xs font-medium lg:text-sm">
                      {selectedCard.description}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Experiment.Body>
    </Experiment>
  )
}
