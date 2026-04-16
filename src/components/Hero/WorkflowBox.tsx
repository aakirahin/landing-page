import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"

const springConfig = { stiffness: 100, damping: 20, mass: 1 }

type NodeDef = {
  id: string
  title: string
  time: string
  status?: string
  x: number
  y: number
  w: number
  h: number
}

const nodeDefs: NodeDef[] = [
    { 
        id: "trigger", 
        title: "New user signed up", 
        time: "Just now", 
        x: 30, 
        y: 40,
        w: 150,
        h: 56
    },
    { 
        id: "email", 
        title: "Welcome email sent", 
        time: "2s ago", 
        status: "Success", 
        x: 30, 
        y: 120,
        w: 150,
        h: 56
    },
    { 
        id: "crm", 
        title: "User added to CRM", 
        time: "1s ago", 
        status: "Success", 
        x: 220, 
        y: 120,
        w: 150,
        h: 56
    },
    { 
        id: "invoice", 
        title: "Invoice generated", 
        time: "Just now", 
        status: "Processing", 
        x: 400, 
        y: 120,
        w: 150,
        h: 56
    },
]

const edgeDefs: { from: number; to: number; dir: "down" | "right" }[] = [
  { from: 0, to: 1, dir: "down" },
  { from: 1, to: 2, dir: "right" },
  { from: 2, to: 3, dir: "right" },
]

type Offset = { x: MotionValue<number>; y: MotionValue<number> }

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
  dir: "down" | "right"
}) {
  const sx = useTransform(fromOff.x, (dx) =>
    dir === "down" ? from.x + from.w / 2 + dx : from.x + from.w + dx
  )
  const sy = useTransform(fromOff.y, (dy) =>
    dir === "down" ? from.y + from.h + dy : from.y + from.h / 2 + dy
  )
  const ex = useTransform(toOff.x, (dx) =>
    dir === "down" ? to.x + to.w / 2 + dx : to.x + dx
  )
  const ey = useTransform(toOff.y, (dy) =>
    dir === "down" ? to.y + dy : to.y + to.h / 2 + dy
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
  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
      style={{
        x: offset.x,
        y: offset.y,
        left: node.x,
        top: node.y,
        width: node.w,
        height: node.h
      }}
      className="absolute bg-white border border-gray-200 rounded-lg px-3 py-2 cursor-grab active:cursor-grabbing select-none shadow-sm z-10"
    >
      <p className="text-[13px] font-medium">
        {node.title}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#7F7F7F]">{node.time}</span>
        {node.status && (
          <span
            className="text-[12px] flex items-center gap-0.5 font-medium"
            style={{ color: "gren" }}
          >
            {node.status === "Success" ? "✓" : "◌"} {node.status}
          </span>
        )}
      </div>
    </motion.div>
  )
}

const WorkflowBox = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const n0: Offset = { x: useMotionValue(0), y: useMotionValue(0) }
  const n1: Offset = { x: useMotionValue(0), y: useMotionValue(0) }
  const n2: Offset = { x: useMotionValue(0), y: useMotionValue(0) }
  const n3: Offset = { x: useMotionValue(0), y: useMotionValue(0) }
  const offsets = [n0, n1, n2, n3]

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
        {edgeDefs.map((edge, i) => (
          <SpringEdge
            key={i}
            from={nodeDefs[edge.from]}
            to={nodeDefs[edge.to]}
            fromOff={offsets[edge.from]}
            toOff={offsets[edge.to]}
            dir={edge.dir}
          />
        ))}
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
