import GetStartedButton from './GetStartedButton'
import callImg from "../../assets/call.svg"
import { buttonClass } from '../../utils/tailwindClasses'

const ButtonSet = () => {
    return (
        <div className="flex gap-[24px]">
            <GetStartedButton/>
            <button className={`${buttonClass} pl-[8px] pr-[16px] py-[8px] gap-2 bg-gray-200 hover:bg-gray-100`}>
                <img
                    src={callImg}
                    width={32}
                    height={32}
                />
                Book a call
            </button>
        </div>
    )
}

export default ButtonSet