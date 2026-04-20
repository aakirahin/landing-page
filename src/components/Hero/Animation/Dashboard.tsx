import React, { type RefObject } from 'react'
import WorkflowBox from "./WorkflowBox"
import AnalyticsBox from "./AnalyticsBox";
import UsersBox from "./UsersBox";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { LuBell, LuMoon, LuSun } from "react-icons/lu";
import callImg from "../../../assets/call.svg"
import { useTheme } from './ThemeContext';
import ChartLineMultiple from '../../ui/LineChart';

const darkModeTheme = (darkMode: boolean) => (darkMode ? "bg-[#353535] border-[#FFFFFF20]" : "bg-white")

type Props = {
    ref: RefObject<HTMLDivElement | null>
}

type BoxProps = {
  box: {
    opacity: MotionValue
    x: MotionValue
    y: MotionValue
    scale: MotionValue
    rotate: MotionValue
  }
  title: string
  showButton?: boolean
  buttonLabel?: string
  children: React.ReactNode
}

const Box = ({ 
  box,
  title,
  showButton = false,
  buttonLabel,
  children
}: BoxProps) => {
    const { darkMode } = useTheme()

    //  Nesting divs to allow scroll + drag otherwise they fight each other
    return (
        <motion.div style={box}>
            <motion.div
                className={`${darkModeTheme(darkMode)} border rounded-[20px] shadow-lg p-[24px] flex flex-col gap-[8px] transition-colors duration-300 h-full`}
                drag
                dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                dragElastic={0.15}
            >
                <div className="flex justify-between items-center">
                    <span className="text-[16px] font-medium">{title}</span>
                    {
                        showButton && 
                        <button className={`bg-blue-500 py-2 px-3 text-white rounded-md cursor-pointer hover:bg-blue-400 transition-colors duration-300 text-[12px]`}>
                            {buttonLabel}
                        </button>
                    }
                </div>
                {children}
            </motion.div>
        </motion.div>
    )
}

const Topbar = () => {
    const { darkMode, toggleTheme } = useTheme()

    return (
        <div className={`flex items-center justify-between px-[16px] py-[10px] border-b ${darkModeTheme(darkMode)} rounded-t-[16px] duration-300 transition-colors`}>
            <input
                placeholder="Search..."
                className={`border px-2 py-1 rounded-md w-1/5 text-[13px] ${darkMode && "border-[#FFFFFF20] text-white"} duration-300 transition-colors`}
            />
            <div className="flex items-center gap-[16px]">
                <LuBell size={18} className="icon-muted"/>
                {
                    darkMode ?
                    <LuSun size={18} className="icon-muted" onClick={() => toggleTheme(!darkMode)}/> :
                    <LuMoon size={18} className="icon-muted" onClick={() => toggleTheme(!darkMode)}/>
                }
                <img
                    src={callImg}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="hover:opacity-[75%] cursor-pointer transition-opacity duration-300"
                />
            </div>
        </div>
    )
}

const Dashboard = ({
    ref
}: Props) => {
    const { darkMode } = useTheme()
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    });

    // Wrap to disable framer-motion's CSS scroll-driven animation acceleration,
    // which uses the viewport scroll timeline instead of the target section's.
    const progress = useTransform(scrollYProgress, (v) => v);
    
    const box = {
        opacity: useTransform(progress, [0, 1], [1, 1]),
        scale: useTransform(progress, [0, 1], [1.1, 1])
    }

    const left = useTransform(progress, [0, 1], [-50, 0])
    const right = useTransform(progress, [0, 1], [50, 0])

    const top = useTransform(progress, [0, 1], [-50, 0])
    const bottom = useTransform(progress, [0, 1], [50, 0])
    
    const rotateLeft = useTransform(progress, [0, 1], [2, 0])
    const rotateRight = useTransform(progress, [0, 1], [-2, 0])
    
    return (
        <div className={`flex flex-col flex-1 ${darkMode ? "bg-[#2D2D2D] text-white border-[#FFFFFF20]" : "bg-[#FAFAFA]"} border rounded-[20px] shadow-xl transition-colors duration-300`}>
            <Topbar/>
            <div className='my-[8px] mx-[16px]'>
                <h1 className='text-2xl font-semibold'>Home</h1>
                <p className={`${darkMode ? "text-[#FFFFFF75]" : "text-subtle"} text-[14px]`}>Drag one of the boxes for a fun surprise!</p>
                <div className="mt-[16px] grid grid-cols-2 grid-rows-2 gap-[16px] h-3/4">
                    <Box 
                        box={{ ...box, x: left, y: top, rotate: rotateLeft }} 
                        title="Running Workflow" 
                        showButton
                        buttonLabel="New workflow"
                    >
                        <WorkflowBox />
                    </Box>
                    <Box 
                        box={{ ...box, x: right, y: top, rotate: rotateRight }} 
                        title="Analytics"
                    >
                        <AnalyticsBox/>
                    </Box>
                    <Box 
                        box={{ ...box, x: left, y: bottom, rotate: rotateLeft }}
                        title="Integrations"
                    >
                        <ChartLineMultiple/>
                    </Box>
                    <Box 
                        box={{ ...box, x: right, y: bottom, rotate: rotateRight }} 
                        title="Users"
                    >
                        <UsersBox/>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Dashboard