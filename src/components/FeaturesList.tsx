import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { cardClass, containerClass, h2Class, secondaryClass } from '../utils/tailwindClasses';
import GlowingBadge from './GlowingBadge';

const features = [
  {
    id: 1,
    title: 'Workflow Automation',
    description: 'Create custom workflows to eliminate repetitive tasks and save hours every week.',
  },
  {
    id: 2,
    title: 'Real-time Analytics',
    description: 'Track performance with live dashboards and actionable insights.',
  },
  {
    id: 3,
    title: 'Team Collaboration',
    description: 'Keep everyone aligned with shared workspaces and instant updates.',
  },
  {
    id: 4,
    title: 'Integrations',
    description: 'Connect with tools like Slack, Google Workspace, and Zapier.',
  },
]

const clamp = (value: number, min: number, max: number) => (Math.min(Math.max(value, min), max))

function Stepper({ progress, activeIndex }: { progress: number, activeIndex: number }) {
  const totalSteps = features.length
  const fillHeight = `${progress * 100}%`

  return (
    <div className="relative h-105 w-10">
      <div className="absolute left-1/2 h-full w-0.75 -translate-x-1/2 bg-gray-200" />
      <motion.div
        className="absolute left-1/2 w-0.75 -translate-x-1/2 bg-blue-500"
        style={{ height: fillHeight }}
      />
      {
        features.map((step, index) => {
          const topPercent = totalSteps === 1 ? 0 : (index / (totalSteps - 1)) * 100
          const isActive = index === activeIndex
          const isCompleted = index < activeIndex

          return (
            <div
              key={step.id}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${topPercent}%` }}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-white ${secondaryClass} ${(isActive || isCompleted) && "text-blue-500"}`}>
                {step.id}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

function FeatureContent({ activeIndex }: { activeIndex: number }) {
  const activeFeature = features[activeIndex]

  return (
    <div className="w-2/3 flex flex-col gap-8">
      <GlowingBadge/>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFeature.id}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="space-y-4"
        >
          <h2 className={h2Class}>
            {activeFeature.title}
          </h2>
          <p className={secondaryClass}>
            {activeFeature.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const FeaturesList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest)
    const total = features.length
    const nextIndex = clamp(Math.floor(latest * total), 0, total - 1)
    setActiveIndex(nextIndex)
  })

  return (
    <section ref={ref} className="relative h-[400vh] w-full flex justify-center">
      <div className={`${containerClass} ${cardClass} sticky top-10 flex justify-between`}>
        <div className='flex gap-[32px] pt-[32px] w-1/2'>
          <Stepper progress={progress} activeIndex={activeIndex} />
          <FeatureContent activeIndex={activeIndex} />
        </div>
        <div className=" w-1/2 rounded-[22px] bg-gray-200 items-end" />
      </div>
    </section>
  )
}

export default FeaturesList