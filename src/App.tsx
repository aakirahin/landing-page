import AnimatedText from "./components/AnimatedText"
import FeaturesList from "./components/FeaturesList"
import HeroAnimation from "./components/Hero/HeroAnimation"
import HeroText from "./components/Hero/HeroText"
import LogoList from "./components/Hero/LogoList"
import SecondHero from "./components/Hero/SecondHero"
import Layout from "./components/Layout/Layout"
import StatsList from "./components/StatsList"
import WallOfLove from "./components/WallOfLove"

function App() {
  return (
    <Layout>
      <section className="flex flex-col gap-[108px] items-center justify-center w-full">
        <HeroText/>
        <LogoList/>
        <HeroAnimation/>
      </section>
      <FeaturesList/>
      <section className="flex flex-col items-center justify-center w-full">
        <WallOfLove/>
        {/* <StatsList/> */}
        <AnimatedText text="Ready to streamline your workflow?"/>
      </section>
      <SecondHero/>
    </Layout>
  )
}

export default App
