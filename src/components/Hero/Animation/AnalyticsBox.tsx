import { useState } from "react"
import { useTheme } from "./ThemeContext"

const darkModeTheme = (darkMode: boolean) => (darkMode ? "border-[#FFFFFF25]" : "border-gray-200")

const workflows = [
  { name: "Onboarding", count: 1284, status: "Active" },
  { name: "Lead Capture", count: 842, status: "Active" },
  { name: "Invoice", count: 421, status: "Paused" },
  { name: "Support Ticket", count: 2310, status: "Active" },
]

const AnalyticsBox = () => {
    const { darkMode } = useTheme()
    const [hoveredIndex, setHoveredindex] = useState<number | null>(null)

    return (
        <div className="flex flex-col justify-center items-center w-full h-full gap-[8px]">
            <div className={`relative flex w-full h-full border-b border-l ${darkModeTheme(darkMode)} px-6 gap-6 transition-colors duration-300`}>
                {/* Horizontal grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={`grid-${i}`}
                        className={`absolute left-0 w-full border-t ${darkModeTheme(darkMode)} transition-colors duration-300`}
                        style={{ bottom: `${(i / 4) * 100}%` }}
                    />
                ))}
                {/* Vertical dashed dividers + bars */}
                {
                    workflows.map((wf, i) => {
                        const maxCount = Math.max(...workflows.map(w => w.count))
                        const heightPercent = (wf.count / maxCount) * 100
                        return (
                            <div 
                                className="relative flex flex-col justify-between w-full gap-4 cursor-pointer pt-2"
                                onMouseEnter={() => setHoveredindex(i)}
                                onMouseLeave={() => setHoveredindex(null)}
                            >
                                <div className={`flex flex-col border rounded-[15px] px-[12px] py-[8px] ${darkMode ? "bg-[#414141] border-[#FFFFFF20]" : "bg-white border-gray-200"} transition-colors duration-300`}>
                                    <span className={`text-[12px] font-medium ${darkMode ? "text-[#FFFFFF75]" : "text-subtle"}`}>{wf.name}</span>
                                    <span className="font-semibold text-lg">{wf.count}</span>
                                </div>
                                <div 
                                    key={wf.name} 
                                    className={`w-full rounded-t-[20px] ${i === hoveredIndex ? "bg-[#007CEF]" : "bg-[#0084FF]" } transition-colors duration-200`}
                                    style={{ height: `${heightPercent}%` }}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <span className="text-[13px]">Workflows</span>
        </div>
    )
}

export default AnalyticsBox