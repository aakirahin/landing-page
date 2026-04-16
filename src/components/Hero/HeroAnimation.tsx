import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import logo from "../../assets/white_logo.svg"
import { GoHomeFill } from "react-icons/go";
import { 
  LuChartColumnBig, 
  LuLogOut, 
  LuBell,
  LuMoon,
  LuUsers,
} from "react-icons/lu";
import { HiOutlineCog } from "react-icons/hi";
import callImg from "../../assets/call.svg"
import WorkflowBox from "./WorkflowBox"

const hoverClass = "hover:opacity-[80%] transition-opacity duration-300 cursor-pointer"

const Sidebar = () => (
  <div className="w-16 bg-[#3F3F3F] text-white flex-col-center rounded-l-[30px]">
    <img
      src={logo}
      alt="Logo"
      width={24}
      className={`my-[32px] ${hoverClass}`}
    />
    <div className="flex flex-col gap-[24px]">
      <GoHomeFill size={18} className={hoverClass}/> 
      <LuChartColumnBig size={18} className="icon-sidebar"/>
      <LuUsers size={18} className="icon-sidebar"/>
    </div>
    <div className="mt-auto mb-[32px] flex flex-col gap-[24px] items-center">
      <HiOutlineCog size={18} className="icon-sidebar"/>
      <LuLogOut size={18} className="icon-sidebar"/>
    </div>
  </div>
)

const Topbar = () => (
  <div className="flex items-center justify-between px-[16px] py-[10px] border-b bg-white rounded-t-[16px]">
    <input
      placeholder="Search..."
      className="border px-3 py-2 rounded-lg w-1/4"
    />
    <div className="flex items-center gap-[16px]">
      <LuBell size={18} className="icon-muted"/>
      <LuMoon size={18} className="icon-muted"/>
      <img
        src={callImg}
        alt="Avatar"
        width={32}
        height={32}
      />
    </div>
  </div>
)

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
  children: React.ReactNode
}

const Box = ({ 
  box,
  title,
  showButton = false,
  children
}: BoxProps) => {
  return (
    <motion.div
      style={box}
      className="bg-white rounded-[20px] shadow-lg p-[24px] flex flex-col gap-[16px]"
    >
      <div className="flex justify-between">
        <span className="text-[16px] font-medium">{title}</span>
        {
          showButton && 
          <button className="bg-[#3F3F3F] py-2 px-3 text-white rounded-md cursor-pointer hover:bg-[#646464] transition-colors duration-300">
            New workflow
          </button>
        }
      </div>
      {children}
    </motion.div>
  )
}

const Box1 = ({ scrollYProgress }: { scrollYProgress: MotionValue }) => {
  const box1 = {
    opacity: useTransform(scrollYProgress, [0, 1], [0, 1]),
    x: useTransform(scrollYProgress, [0, 1], [-100, 0]),   // from left OUTSIDE
    y: useTransform(scrollYProgress, [0, 1], [-100, 0]),   // from above
    scale: useTransform(scrollYProgress, [0, 1], [1.1, 1]), // scale DOWN
    rotate: useTransform(scrollYProgress, [0, 1], [2, 0])  // rotate into place
  };

  return (
    <Box box={box1} title="Running Workflow" showButton>
      <WorkflowBox />
    </Box>
  )
}

const Box2 = ({ scrollYProgress }: { scrollYProgress: MotionValue }) => {
  const box2 = {
    opacity: useTransform(scrollYProgress, [0, 1], [0, 1]),
    x: useTransform(scrollYProgress, [0, 1], [100, 0]),     // from right OUTSIDE
    y: useTransform(scrollYProgress, [0, 1], [-100, 0]),
    scale: useTransform(scrollYProgress, [0, 1], [1.1, 1]),
    rotate: useTransform(scrollYProgress, [0, 1], [-2, 0])
  };

  return (
    <Box box={box2} title="Analytics">
      Hi
    </Box>
  )
}

const Box3 = ({ scrollYProgress }: { scrollYProgress: MotionValue }) => {
  const box3 = {
    opacity: useTransform(scrollYProgress, [0, 1], [0, 1]),
    x: useTransform(scrollYProgress, [0, 1], [-100, 0]),
    y: useTransform(scrollYProgress, [0, 1], [100, 0]),     // from below
    scale: useTransform(scrollYProgress, [0, 1], [1.1, 1]),
    rotate: useTransform(scrollYProgress, [0, 1], [2, 0])
  };


  return (
    <Box box={box3} title="Integrations">
      Hi
    </Box>
  )
}

const Box4 = ({ scrollYProgress }: { scrollYProgress: MotionValue }) => {
  const box4 = {
    opacity: useTransform(scrollYProgress, [0, 1], [0, 1]),
    x: useTransform(scrollYProgress, [0, 1], [100, 0]),
    y: useTransform(scrollYProgress, [0, 1], [100, 0]),
    scale: useTransform(scrollYProgress, [0, 1], [1.1, 1]),
    rotate: useTransform(scrollYProgress, [0, 1], [-2, 0])
  };

  return (
    <Box box={box4} title="Users">
      Hi
    </Box>
  )
}

const HeroAnimation = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Wrap to disable framer-motion's CSS scroll-driven animation acceleration,
  // which uses the viewport scroll timeline instead of the target section's.
  const progress = useTransform(scrollYProgress, (v) => v);

  return (
    <section ref={ref} className="section-scroll h-[300vh]">
      <div className={`container-box bg-[#3F3F3F] p-[16px] border border-gray-100 sticky top-10 flex shadow-xl`}>
        <Sidebar/>
        <div className="flex flex-col flex-1 bg-[#FAFAFA] rounded-[20px] shadow-xl">
          <Topbar/>
          <div className="h-full p-[16px]">
            <h1 className="text-3xl font-semibold mb-[16px]">Home</h1>
            <div className="grid grid-cols-2 gap-[16px] h-full" style={{ perspective: "1200px" }}>
              <Box1 scrollYProgress={progress}/>
              <Box2 scrollYProgress={progress}/>
              <Box3 scrollYProgress={progress}/>
              <Box4 scrollYProgress={progress}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroAnimation