import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Word = ({
    word,
    index,
    total,
    scrollYProgress,
}: {
    word: string
    index: number
    total: number
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) => {
    const start = 0.1 + (index / total) * 0.7
    const end = start + 0.1

    const color = useTransform(scrollYProgress, [start, end], ['#d1d5db', '#3F3F3F'])

    return (
        <motion.span style={{ color }}>
            {word}{index < total - 1 ? ' ' : ''}
        </motion.span>
    )
}

const AnimatedText = ({ text }: { text: string }) => {
    const words = text.split(' ')
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    return (
        <div ref={containerRef} className="relative h-[300vh]">
            <div className="sticky top-0 h-screen flex-center px-8">
                <p className={`text-h1 text-center`}>
                    {words.map((word, i) => (
                        <Word
                            key={i}
                            word={word}
                            index={i}
                            total={words.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </p>
            </div>
        </div>
    )
}

export default AnimatedText