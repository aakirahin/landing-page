import { HiSparkles } from 'react-icons/hi2'
import Button from './Button'

const GetStartedButton = () => {
    return (
        <Button
            img={false}
            icon={<HiSparkles/>}
            label="Get Started"
            className='btn-primary'
        />
    )
}

export default GetStartedButton