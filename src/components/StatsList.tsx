import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TbUsers } from "react-icons/tb"
import { cardClass } from "../utils/tailwindClasses"
import AnimatedCounter from "./AnimatedCounter"
import { LuClock2, LuMessageCircleHeart, LuSettings } from "react-icons/lu"

const COLOURS = ["#9CEC5B", "#F0F465", "#E4C1F9", "#80c1ff"]
const FAN_COMPLETE_PROGRESS = 0.5
const iconClass = "bg-[#FFFFFF35] p-2 rounded-full"
const stats = [
    { 
        label: "Active Users", 
        value: 25000, 
        suffix: "+",
        icon: <TbUsers size={40} className={iconClass} color="#646464"/>
    },
    { 
        label: "Tasks Automated", 
        value: 3.2, 
        suffix: "M+",
        icon: <LuSettings size={40} className={iconClass} color="#646464"/>
    },
    { 
        label: "Hours Saved", 
        value: 120000, 
        suffix: "",
        icon: <LuClock2 size={40} className={iconClass} color="#646464"/>
    },
    { 
        label: "Customer Satisfaction", 
        value: 98, 
        suffix: "%",
        icon: <LuMessageCircleHeart size={40} className={iconClass} color="#646464"/>
    }
]

const StatsList = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "end 45%"]
    })

    return (
        <div
            ref={containerRef}
            className="relative w-full h-fit md:h-105 overflow-visible"
        >
            {
                stats.map((stat, i) => (
                    <StatCard
                        key={stat.label}
                        index={i}
                        scrollYProgress={scrollYProgress}
                        stat={stat}
                        colour={COLOURS[i]}
                    />
                ))
            }
        </div>
    )
}

const StatCard = ({
    index,
    stat,
    colour,
    scrollYProgress
}: {
    index: number
    stat: typeof stats[number]
    colour: string
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
}) => {
    const fanX = [-250, -85, 85, 250]
    const fanY = [0, -26, -26, 0]
    const fanRotate = [-10, -3, 3, 10]

    const x = useTransform(scrollYProgress, [0, FAN_COMPLETE_PROGRESS], [0, fanX[index]])
    const y = useTransform(scrollYProgress, [0, FAN_COMPLETE_PROGRESS], [0, fanY[index]])
    const rotate = useTransform(scrollYProgress, [0, FAN_COMPLETE_PROGRESS], [0, fanRotate[index]])
    const opacity = useTransform(scrollYProgress, [0, FAN_COMPLETE_PROGRESS * 0.4], [0.75, 1])

    return (
        <motion.div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 w-55 md:w-60 p-[32px] rounded-[20px]`}
            style={{
                x,
                y,
                rotate,
                opacity,
                zIndex: index + 1,
                backgroundColor: colour
            }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
            {stat.icon}
            <div className="flex flex-col gap-0">
                <AnimatedCounter
                    to={stat.value}
                    suffix={stat.suffix}
                />
                <span className="font-medium">{stat.label}</span>
            </div>
        </motion.div>
    )
}

export default StatsList