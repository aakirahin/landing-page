import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const CURSOR_COLORS = [
  { bg: "#FF5CBE", arrow: "#FF5CBE" },  // pink
  { bg: "#A259FF", arrow: "#A259FF" },  // purple
  { bg: "#7B8CFF", arrow: "#7B8CFF" },  // blue
  { bg: "#85D2F5", arrow: "#85D2F5" },  // light blue
  { bg: "#4ECB71", arrow: "#4ECB71" },  // green
  { bg: "#F7A933", arrow: "#F7A933" },  // orange
  { bg: "#7EC8C8", arrow: "#7EC8C8" },  // teal
]

const FAKE_NAMES = ["Leonardo", "Jane", "Sophie", "Alex", "Luna", "Lexie", "Ali"]

interface CursorProps {
  name: string
  color: { bg: string; arrow: string }
}

const CursorSvg = ({ color }: { color: string }) => (
  <svg
    width="19"
    height="24"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}
  >
    <path
      d="M0.928711 0.640625L14.9287 9.64062L7.42871 10.6406L3.92871 18.6406L0.928711 0.640625Z"
      fill={color}
      stroke="white"
      strokeWidth="1"
    />
  </svg>
)

const CursorLabel = ({ name, color }: CursorProps) => (
  <div className="flex items-start gap-0 pointer-events-none select-none">
    <CursorSvg color={color.arrow} />
    <span
      className="text-white text-sm font-medium px-3.5 py-1 rounded-full whitespace-nowrap -ml-1 mt-3.5"
      style={{
        backgroundColor: color.bg,
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
      }}
    >
      {name}
    </span>
  </div>
)

// Fixed positions around the periphery (percentages of container), avoiding center text
const CURSOR_POSITIONS = [
  { xPct: 0.52, yPct: 0.12 },  // top center-right
  { xPct: 0.30, yPct: 0.30 },  // upper left
  { xPct: 0.75, yPct: 0.28 },  // upper right
  { xPct: 0.12, yPct: 0.50 },  // left
  { xPct: 0.38, yPct: 0.62 },  // lower center-left
]

const DRIFT_RADIUS = 30 // max pixels a cursor drifts from home

interface FakeCursorState {
  name: string
  color: { bg: string; arrow: string }
  homeX: number
  homeY: number
  x: number
  y: number
}

const FakeCursor = ({ cursor }: { cursor: FakeCursorState }) => {
  const [pos, setPos] = useState({ x: cursor.x, y: cursor.y })
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const drift = useCallback(() => {
    const angle = Math.random() * Math.PI * 2
    const dist = Math.random() * DRIFT_RADIUS
    const newX = cursor.homeX + Math.cos(angle) * dist
    const newY = cursor.homeY + Math.sin(angle) * dist
    setPos({ x: newX, y: newY })

    const delay = 3000 + Math.random() * 5000
    timeoutRef.current = setTimeout(drift, delay)
  }, [cursor.homeX, cursor.homeY])

  useEffect(() => {
    const initialDelay = 1000 + Math.random() * 3000
    timeoutRef.current = setTimeout(drift, initialDelay)
    return () => clearTimeout(timeoutRef.current)
  }, [drift])

  return (
    <motion.div
      className="absolute top-0 left-0 pointer-events-none"
      animate={{ x: pos.x, y: pos.y }}
      transition={{
        type: "tween",
        duration: 2 + Math.random() * 1.5,
        ease: "easeInOut",
      }}
    >
      <CursorLabel name={cursor.name} color={cursor.color} />
    </motion.div>
  )
}

interface FigmaCursorsProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

const FigmaCursors = ({ containerRef }: FigmaCursorsProps) => {
  const [isHovering, setIsHovering] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [fakeCursors, setFakeCursors] = useState<FakeCursorState[]>([])

  // Measure container
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [containerRef])

  // Initialize fake cursors at fixed peripheral positions
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const cursors = CURSOR_POSITIONS.map((pos, i) => {
      const homeX = pos.xPct * dimensions.width
      const homeY = pos.yPct * dimensions.height
      return {
        name: FAKE_NAMES[i],
        color: CURSOR_COLORS[i % CURSOR_COLORS.length],
        homeX,
        homeY,
        x: homeX,
        y: homeY,
      }
    })
    setFakeCursors(cursors)
  }, [dimensions])

  // Track mouse position relative to container
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
    const handleEnter = () => setIsHovering(true)
    const handleLeave = () => setIsHovering(false)

    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseenter", handleEnter)
    el.addEventListener("mouseleave", handleLeave)
    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseenter", handleEnter)
      el.removeEventListener("mouseleave", handleLeave)
    }
  }, [containerRef])

  const userColor = CURSOR_COLORS[5] // orange for the user

  return (
    <>
      {/* Fake cursors — always visible */}
      {fakeCursors.map((cursor) => (
        <FakeCursor key={cursor.name} cursor={cursor} />
      ))}

      {/* User's cursor */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="absolute top-0 left-0 pointer-events-none z-50"
            style={{ x: mousePos.x, y: mousePos.y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            <CursorLabel name="You" color={userColor} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FigmaCursors
