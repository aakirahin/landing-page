import { animate, useInView, useIsomorphicLayoutEffect, type KeyframeOptions } from 'framer-motion'
import { useRef } from 'react'

type Props = {
    from?: number
    to: number
    suffix?: string
    animationOptions?: KeyframeOptions
}

const AnimatedCounter = ({
    from = 0,
    to,
    suffix,
    animationOptions,
}: Props) => {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true })

    useIsomorphicLayoutEffect(() => {
        const element = ref.current

        if (!element || !inView) return

        element.textContent = String(from)

        const controls = animate(from, to, {
            duration: 1.5,
            ease: "easeOut",
            ...animationOptions,
            onUpdate: (value) => {
                element.textContent = value.toFixed(0)
            }
        })

        return () => {
            controls.stop()
        }
    }, [ref, from, to, inView])

    return (
        <div className='flex gap-0.5 items-center text-4xl font-bold tracking-tighter'>
            <span ref={ref}/>
            <span>{suffix}</span>
        </div>
    )
}

export default AnimatedCounter