import { useRef } from "react"
import Button from "../Buttons/Button"
import FigmaCursors from "./FigmaCursors"

const SecondHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className={`container-box card bg-white flex-col-center justify-center relative overflow-hidden cursor-none`}>
      <div className={`flex-col-center justify-center gap-6 relative z-10`}>
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
      <FigmaCursors containerRef={containerRef} />
    </div>
  )
}

export default SecondHero