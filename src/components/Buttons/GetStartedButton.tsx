import { HiSparkles } from 'react-icons/hi2'
import Button from './Button'

const GetStartedButton = () => {
    return (
        <Button
            img={false}
            icon={<HiSparkles/>}
            label="Get Started"
            className='text-white bg-[#0084FF] hover:bg-[#4DA9FF]'
        />
    )
}

export default GetStartedButton