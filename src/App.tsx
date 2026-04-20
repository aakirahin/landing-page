import ScrollText from "./components/ScrollText"
import FeaturesList from "./components/FeaturesList/FeaturesList"
import HeroAnimation from "./components/Hero/Animation/HeroAnimation"
import HeroText from "./components/Hero/HeroText"
import LogoList from "./components/Hero/LogoList"
import SecondHero from "./components/Hero/SecondHero"
import Layout from "./components/Layout/Layout"
import WallOfLove from "./components/WallOfLove"

function App() {
  return (
    <Layout>
      <section className="flex-col-center gap-[108px] w-full">
        <HeroText/>
        <LogoList/>
        <HeroAnimation/>
      </section>
      <FeaturesList/>
      <section className="flex flex-col items-center justify-center w-full">
        <WallOfLove/>
        <ScrollText text="Ready to streamline your workflow?"/>
      </section>
      <SecondHero/>
    </Layout>
  )
}

export default App
