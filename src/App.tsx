import FeaturesList, { StepperSection } from "./components/FeaturesList"
import Hero from "./components/Hero/Hero"
import HeroAnimation from "./components/Hero/HeroAnimation"
import NavBar from "./components/Layout/NavBar"
import LogoList from "./components/LogoList"

function App() {
  return (
    <div className="flex flex-col gap-[108px] items-center justify-center mb-[108px]">
      <NavBar/>
      <Hero/>
      <LogoList/>
      <HeroAnimation/>
      <FeaturesList/>
    </div>
  )
}

export default App
