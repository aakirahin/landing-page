import Button from './Button'
import GetStartedButton from './GetStartedButton'
import callImg from "../../assets/call.svg"

const ButtonSet = () => {
    return (
        <div className="flex gap-[24px]">
            <GetStartedButton/>
            <Button
                img={true}
                icon={
                    <img
                        src={callImg}
                        alt="Avatar"
                        width={32}
                        height={32}
                    />
                }
                label="Book a call"
                className='bg-gray-200 hover:bg-gray-100'
            />
        </div>
    )
}

export default ButtonSet