import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import Button from "../Buttons/Button"
import stickyNote from "../../assets/clutter/sticky-note-paper-transparent-free-png.png"
import pencil from "../../assets/clutter/Pencil-PNG.png"
import folder from "../../assets/clutter/folder_PNG100467.png"
import coffee from "../../assets/clutter/ai-generated-cup-of-coffee-top-view-with-transparent-background-free-png.png"
import laptop from "../../assets/clutter/image 8 (1).svg"
import glasses from "../../assets/clutter/eyeglasses-clipart-folded-glass-17.png"
import work from "../../assets/clutter/image 6.svg"
import work2 from "../../assets/clutter/image 7.svg"
import plant from "../../assets/clutter/house-plant-monstera-deliciosa-in-pot-top-view-ai-generated-free-png.png"

const Image = ({ 
  img,
  scrollYProgress
}: { 
  img: {
    src: string
    rotation: number
    x: number
    y: number
    width: string
  }
  scrollYProgress: MotionValue<number>
}) => {
  const { src, rotation, x, y, width } = img
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1])
  
  return (
    <motion.img
      src={src}
      alt="Image"
      width={width}
      className="absolute"
      style={{ rotate: rotation, x, y, scale }}
    />
  )
}

const SecondHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }

    updateDimensions()
    
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  const fullWidth = containerDimensions.width
  const fullHeight = containerDimensions.height

  // left is 0
  const right = fullWidth - 200
  // top is 0
  const bottom = fullHeight - 200
  const middle = fullHeight / 2 - 100
  
  // Define positions around the central text
  const images = [
    { src: stickyNote, rotation: -6, x: 0, y: 0, width: "30%" }, // top-left
    { src: pencil, rotation: 40, x: 150, y: -100, width: "20%" }, // top-left
    { src: laptop, rotation: -6, x: -150, y: middle - 50, width: "25%" }, // middle-left
    { src: work2, rotation: -10, x: 0, y: middle + 100, width: "15%" }, // middle-left
    { src: glasses, rotation: -10, x: 100, y: bottom, width: "30%" }, // bottom-left

    { src: coffee, rotation: 5, x: right - 100, y: 0, width: "30%" }, // top-right
    { src: folder, rotation: -4, x: right - 50, y: 0, width: "10%" }, // middle-right
    { src: work, rotation: 4, x: right + 50, y: middle + 50, width: "15%" }, // middle-right
    { src: plant, rotation: 4, x: right - 200, y: bottom - 150, width: "30%" }, // bottom-right
  ]

  return (
    <div ref={containerRef} className={`container-box card bg-white flex-col-center justify-center relative`}>
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        {
          images.map((img, i) => (
            <Image
              key={i}
              img={img}
              scrollYProgress={scrollYProgress}
            />
          ))
        }
      </div>
      <div className={`flex-col-center justify-center gap-6 relative`}>
        <h1 className="text-h1">Work smarter, not harder.</h1>
        <div className={`flex-col-center text-subtle`}>
          <p>Automate tasks, collaborate seamlessly, and scale your business faster.</p>
          <p>Join thousands of teams already using Synchrono.</p>
        </div>
        <Button 
          img={false} 
          label="Start your free trial"
          className='btn-primary'
        />
      </div>
      {/* <FallingText
        text={`React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.`}
        highlightWords={["React", "Bits", "animated", "components", "simplify"]}
        highlightClass="highlighted"
        trigger="auto"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.4}
        fontSize="2.4rem"
        mouseConstraintStiffness={0.1}
        className="-z-1"
      /> */}
    </div>
  )
}

export default SecondHero