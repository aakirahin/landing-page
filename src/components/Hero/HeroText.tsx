import { h1Class, secondaryClass } from "../../utils/tailwindClasses"
import ButtonSet from "../Buttons/ButtonSet"

const divClass = "flex flex-col items-center"

const verbs = ["Automate", "Streamline", "Optimise", "Simplify"]

const HeroText = () => {
    return (
        <div className={`${divClass} gap-[24px]`}>
            <div className={`${divClass} gap-[8px]`}>
                <h1 
                    id="text-container"
                    className={`${h1Class} flex`}
                > 
                    <div 
                        id="verbs-container"
                        className="rounded-[30px]"
                    >
                        {verbs.map((verb) => (<span id="verb" key={verb}>{verb}</span>))}
                    </div>
                    <p>&nbsp;your workflows.</p>
                </h1>
                <h1 className={h1Class}>Focus on what matters.</h1>
            </div>
            <div className={`${divClass} ${secondaryClass}`}>
                <p>We helps teams streamline operations, automate repetitive tasks, and gain real-time insights.</p>
                <p>All in one platform.</p>
            </div>
            <ButtonSet/>
        </div>
    )
}

export default HeroText