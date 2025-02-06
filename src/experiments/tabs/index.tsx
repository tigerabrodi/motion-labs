import { PlusIcon, XIcon } from 'lucide-react'
import { AnimatePresence, Reorder, motion } from 'motion/react'
import { useState } from 'react'
import { Experiment } from '../../components/experiment'
import { cn } from '../../lib/utils'

type Tab = {
  label: string
  id: string
}

type Props = {
  item: Tab
  isSelected: boolean
  onClick: () => void
  onRemove: () => void
  disabled: boolean
}

function removeItem<T>(arr: Array<T>, item: T): Array<T> {
  return arr.filter((currentItem) => currentItem !== item)
}

function getNextSelectedTab(tabs: Array<Tab>, closedTab: Tab): Tab {
  const index = tabs.findIndex((tab) => tab.id === closedTab.id)

  // No tab found -> first tab
  if (index === -1) return tabs[0]

  // Last tab -> previous tab
  if (index === tabs.length - 1) return tabs[index - 1]

  // Middle tab -> next tab
  return tabs[index + 1]
}

export const Tab = ({
  item,
  onClick,
  onRemove,
  isSelected,
  disabled,
}: Props) => {
  return (
    <Reorder.Item
      value={item}
      id={item.label}
      transition={{ duration: 0.1, type: 'tween' }}
      initial={{ opacity: 0 }}
      whileDrag={{
        zIndex: 10,
      }}
      animate={{
        opacity: 1,
        backgroundColor: isSelected
          ? 'var(--color-primary-400)'
          : 'var(--color-primary-600)',
        scaleY: isSelected ? 1.025 : 1,
        zIndex: isSelected ? 10 : 0,
      }}
      exit={{
        opacity: 0,
        transformOrigin: 'left',
        width: 0,
      }}
      className={cn(
        'flex max-w-40 min-w-32 flex-1 items-center justify-center rounded-xl rounded-b-none p-1.5'
      )}
      onPointerDown={onClick}
    >
      <motion.div
        className={cn(
          'hover:bg-primary-500 flex w-full items-center justify-between rounded-xl px-1.5 py-1 transition-colors duration-150 lg:px-2.5',
          {
            'hover:bg-transparent': isSelected,
          }
        )}
      >
        <span className="text-primary-200 text-sm font-medium text-nowrap">
          {item.label}
        </span>
        <div>
          <motion.button
            onPointerDown={(event) => {
              event.stopPropagation()
              onRemove()
            }}
            disabled={disabled}
            className="text-primary-200 hover:text-primary-100 hover:bg-primary-500 flex items-center justify-center rounded-full p-0.5 duration-150"
          >
            <XIcon size={14} />
          </motion.button>
        </div>
      </motion.div>
    </Reorder.Item>
  )
}

/**
 * Tabs
 *
 * It uses the Reorder component to allow the user to reorder the tabs.
 *
 * To really learn how things work here, I recommend reading the docs on Reorder: https://motion.dev/docs/react-reorder
 *
 */
export function TabsExperiment() {
  const [tabs, setTabs] = useState<Array<Tab>>([
    { label: 'Tab 1', id: 'tab-1' },
    { label: 'Tab 2', id: 'tab-2' },
  ])

  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0])

  function remove(tab: Tab) {
    setTabs(removeItem(tabs, tab))
    setSelectedTab(getNextSelectedTab(tabs, tab))
  }

  function add() {
    const newTab = { label: 'Untitled', id: crypto.randomUUID() }

    setTabs([...tabs, newTab])
    setSelectedTab(newTab)
  }

  const hasOnlyOneTab = tabs.length === 1

  return (
    <Experiment>
      <Experiment.Heading>Tabs</Experiment.Heading>
      <Experiment.Body className="items-start">
        <div className="flex gap-4 p-4 lg:px-12 lg:py-8">
          <Reorder.Group
            as="ul"
            axis="x"
            onReorder={setTabs}
            className="flex rounded-lg"
            values={tabs}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {tabs.map((item) => (
                <Tab
                  key={item.id}
                  item={item}
                  isSelected={selectedTab === item}
                  disabled={hasOnlyOneTab}
                  onClick={() => setSelectedTab(item)}
                  onRemove={() => remove(item)}
                />
              ))}
            </AnimatePresence>
          </Reorder.Group>

          <motion.button
            className="hover:bg-primary-500 text-primary-100 my-auto flex items-center justify-center rounded-full p-1 hover:text-white"
            onClick={add}
            whileTap={{ scale: 0.9 }}
            layout="position"
            transition={{ duration: 0.1, type: 'tween' }}
          >
            <PlusIcon size={18} />
          </motion.button>
        </div>
      </Experiment.Body>
    </Experiment>
  )
}
