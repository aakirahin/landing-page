import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TbUsers } from "react-icons/tb"
import AnimatedCounter from "./AnimatedCounter"
import { LuClock2, LuMessageCircleHeart, LuSettings } from "react-icons/lu"

const colours = ["#9CEC5B", "#F0F465", "#E4C1F9", "#80c1ff"]
const iconClass = "bg-[#FFFFFF35] p-2 rounded-full"
const stats = [
    { 
        label: "Active Users", 
        value: 25000, 
        suffix: "+",
        icon: <TbUsers size={24} color="#646464"/>
    },
    { 
        label: "Tasks Automated", 
        value: 3.2, 
        suffix: "M+",
        icon: <LuSettings size={24} color="#646464"/>
    },
    { 
        label: "Hours Saved", 
        value: 120000, 
        suffix: "",
        icon: <LuClock2 size={24} color="#646464"/>
    },
    { 
        label: "Customer Satisfaction", 
        value: 98, 
        suffix: "%",
        icon: <LuMessageCircleHeart size={24} color="#646464"/>
    }
]

const StatsList = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)

    return (
        <div
            ref={containerRef}
            className="flex-center w-3/4 gap-4"
        >
            {
                stats.map((stat, i) => (
                    <StatCard
                        key={stat.label}
                        stat={stat}
                        colour={colours[i]}
                    />
                ))
            }
        </div>
    )
}

const StatCard = ({
    stat,
    colour,
}: {
    stat: typeof stats[number]
    colour: string
}) => {

    return (
        <motion.div
            className={`flex flex-col gap-6 w-55 md:w-60 p-[32px] rounded-[20px]`}
            style={{ backgroundColor: colour }}
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