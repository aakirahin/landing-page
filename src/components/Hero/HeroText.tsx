import ButtonSet from "../Buttons/ButtonSet"
import RotatingText from "../RotatingText"

const verbs = ["Automate", "Streamline", "Optimise", "Simplify"]

const HeroText = () => {
    return (
        <div className={`flex-col-center gap-[24px]`}>
            <div className={`flex-col-center gap-[8px]`}>
                <h1 
                    id="text-container"
                    className={`text-h1 flex`}
                > 
                    <RotatingText
                        texts={verbs}
                        mainClassName="px-4 bg-[#9CEC5B] overflow-hidden py-2 justify-center rounded-[30px]"
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 40, stiffness: 400 }}
                        rotationInterval={2000}
                    />
                    <p>&nbsp;your workflows.</p>
                </h1>
                <h1 className="text-h1">Focus on what matters.</h1>
            </div>
            <div className={`flex-col-center text-subtle`}>
                <p>We helps teams streamline operations, automate repetitive tasks, and gain real-time insights.</p>
                <p>All in one platform.</p>
            </div>
            <ButtonSet/>
        </div>
    )
}

export default HeroText