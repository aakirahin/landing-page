import { useRef } from "react";
import logo from "../../../assets/white_logo.svg"
import { GoHomeFill } from "react-icons/go";
import { 
  LuChartColumnBig, 
  LuLogOut, 
  LuUsers,
} from "react-icons/lu";
import { HiOutlineCog } from "react-icons/hi";
import { ThemeProvider } from "./ThemeContext";
import Dashboard from "./Dashboard";

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

const HeroAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <ThemeProvider>
      <section ref={ref} className="section-scroll h-[250vh]">
        <div className={`container-box bg-[#3F3F3F] p-[16px] border border-gray-100 sticky top-10 flex shadow-xl`}>
          <Sidebar/>
          <Dashboard ref={ref}/>
        </div>
      </section>
    </ThemeProvider>
  );
}

export default HeroAnimation