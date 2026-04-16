import FeaturesList from "./components/FeaturesList"
import HeroAnimation from "./components/Hero/HeroAnimation"
import HeroText from "./components/Hero/HeroText"
import LogoList from "./components/Hero/LogoList"
import Layout from "./components/Layout/Layout"

function App() {
  return (
    <Layout>
      <section className="flex-col-center gap-[108px] w-full">
        <HeroText/>
        <LogoList/>
        <HeroAnimation/>
      </section>
      <FeaturesList/>
      {/* <section className="flex flex-col items-center justify-center w-full">
        <WallOfLove/>
        <StatsList/>
        <AnimatedText text="Ready to streamline your workflow?"/>
      </section> */}
      {/* <SecondHero/> */}
    </Layout>
  )
}

export default App
