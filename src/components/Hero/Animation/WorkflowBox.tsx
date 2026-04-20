import { motion, motionValue, useSpring, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"
import { MdOutlineCheck, MdClose } from "react-icons/md"
import { Spinner } from "../../ui/spinner"
import { useTheme } from "./ThemeContext"

type Status = "Success" | "Processing" | "Error"
type Direction = "up" | "down" | "right" | "left"
type NodeDef = {
  id: string
  title: string
  time: string
  status?: Status
  col: number
  row: number
}
type Offset = { x: MotionValue<number>; y: MotionValue<number> }

const springConfig = { stiffness: 100, damping: 20, mass: 1 }
const statusConfig = {
  Success: { color: "#00c950", icon: <MdOutlineCheck size={14} /> },
  Processing: { color: "#07A0FF", icon: <Spinner className="size-[14px] mr-0.5" /> },
  Error: { color: "red", icon: <MdClose size={14}/> },
}

const NODE_W = 150
const NODE_H = 60
const GAP_X = 40
const GAP_Y = 20
const PADDING = 30

const getNodePosition = (col: number, row: number) => ({
  x: PADDING + col * (NODE_W + GAP_X),
  y: PADDING + row * (NODE_H + GAP_Y),
})

const nodeDefs: NodeDef[] = [
  { 
    id: "trigger", 
    title: "New user signed up", 
    time: "Just now", 
    col: 0, 
    row: 0,
  },
  { 
    id: "email", 
    title: "Welcome email sent", 
    time: "2s ago", 
    status: "Success", 
    col: 0, 
    row: 1,
  },
  { 
    id: "crm", 
    title: "User added to CRM", 
    time: "1s ago", 
    status: "Success", 
    col: 1, 
    row: 1,
  },
  { 
    id: "invoice", 
    title: "Invoice generated", 
    time: "Just now", 
    status: "Processing", 
    col: 2, 
    row: 1,
  },
]

const edgeDefs: { from: string, to: string, dir: Direction }[] = [
  { from: "trigger", to: "email", dir: "down" },
  { from: "email", to: "crm", dir: "right" },
  { from: "crm", to: "invoice", dir: "right" },
]

function SpringEdge({
  from,
  to,
  fromOff,
  toOff,
  dir,
}: {
  from: NodeDef
  to: NodeDef
  fromOff: Offset
  toOff: Offset
  dir: Direction
}) {
  const fromPos = getNodePosition(from.col, from.row)
  const toPos = getNodePosition(to.col, to.row)

  const sx = useTransform(fromOff.x, (dx) =>
    dir === "down" ? fromPos.x + NODE_W / 2 + dx : fromPos.x + NODE_W + dx
  )
  const sy = useTransform(fromOff.y, (dy) =>
    dir === "down" ? fromPos.y + NODE_H + dy : fromPos.y + NODE_H / 2 + dy
  )
  const ex = useTransform(toOff.x, (dx) =>
    dir === "down" ? toPos.x + NODE_W / 2 + dx : toPos.x + dx
  )
  const ey = useTransform(toOff.y, (dy) =>
    dir === "down" ? toPos.y + dy : toPos.y + NODE_H / 2 + dy
  )

  const rawMidX = useTransform([sx, ex], (v) => ((v[0] as number) + (v[1] as number)) / 2)
  const rawMidY = useTransform([sy, ey], (v) => ((v[0] as number) + (v[1] as number)) / 2)
  const midX = useSpring(rawMidX, springConfig)
  const midY = useSpring(rawMidY, springConfig)

  const d = useTransform(
    [sx, sy, midX, midY, ex, ey],
    (v) => `M ${v[0]} ${v[1]} Q ${v[2]} ${v[3]} ${v[4]} ${v[5]}`
  )

  return (
    <motion.path
      d={d}
      stroke="#b0b0b0"
      strokeWidth={1.5}
      fill="none"
      markerEnd="url(#wf-arrow)"
    />
  )
}

function WorkflowNode({
  node,
  offset,
  constraintsRef,
}: {
  node: NodeDef
  offset: Offset
  constraintsRef: React.RefObject<HTMLDivElement | null>
}) {
  const { darkMode } = useTheme()
  const pos = getNodePosition(node.col, node.row)

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
      style={{
        x: offset.x,
        y: offset.y,
        left: pos.x,
        top: pos.y,
        width: NODE_W,
        height: NODE_H
      }}
      className={`absolute border ${darkMode ? "border-[#FFFFFF15] bg-[#414141]" : "border-gray-200 bg-white"} transition-colors duration-300 rounded-lg px-3 py-2 cursor-grab active:cursor-grabbing select-none shadow-sm z-10`}
    >
      <p className="text-[13px] font-medium">
        {node.title}
      </p>
      <div className="flex items-center justify-between mt-0.5">
        {node.status !== "Processing" && <span className={`text-[12px] ${darkMode ? "text-[#FFFFFF75]" : "text-subtle"}`}>{node.time}</span>}
        {node.status && (
          <span
            className="text-[12px] flex items-center gap-0.5 font-medium"
            style={{ color: statusConfig[node.status]?.color }}
          >
            {statusConfig[node.status]?.icon} {node.status}
          </span>
        )}
      </div>
    </motion.div>
  )
}

const WorkflowBox = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const offsets = useRef(
    nodeDefs.map((node) => ({ id: node.id, x: motionValue(0), y: motionValue(0) }))
  ).current

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-hidden rounded-lg"
      style={{
        backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <marker
            id="wf-arrow"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#b0b0b0" />
          </marker>
        </defs>
        {
          edgeDefs.map((edge, i) => {
            const { from, to } = edge
            const fromNode = nodeDefs.find((node) => node.id === from)
            const toNode = nodeDefs.find((node) => node.id === to)
            const fromOffNode = offsets.find((node) => node.id === from)
            const toOffNode = offsets.find((node) => node.id === to)

            if (fromNode && toNode && fromOffNode && toOffNode){
              return (
                <SpringEdge
                  key={i}
                  from={fromNode}
                  to={toNode}
                  fromOff={fromOffNode}
                  toOff={toOffNode}
                  dir={edge.dir}
                />
              )
            }
          })
        }
      </svg>
      {nodeDefs.map((node, i) => (
        <WorkflowNode
          key={node.id}
          node={node}
          offset={offsets[i]}
          constraintsRef={containerRef}
        />
      ))}
    </div>
  )
}

export default WorkflowBox
