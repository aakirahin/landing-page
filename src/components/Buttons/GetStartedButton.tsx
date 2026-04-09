import { HiSparkles } from 'react-icons/hi2'
import { buttonClass } from '../../utils/tailwindClasses'

const GetStartedButton = () => {
    return (
        <button className={`${buttonClass} px-[16px] py-[12px] text-white bg-[#0084FF] hover:bg-[#4DA9FF]`}>
            <HiSparkles />
            Get started
        </button>
    )
}

export default GetStartedButton