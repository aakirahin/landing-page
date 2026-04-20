import { FaCircle } from "react-icons/fa";

type Props = {
    label: string
}

const GlowingBadge = ({
    label,
}: Props) => {
    return (
        <span className={`w-fit text-[12px] uppercase font-semibold bg-blue-100 rounded-full text-blue-500 flex items-center px-3 py-1.5 gap-0.5`}>
            <FaCircle size={6} className='animate-pulse'/>
            &nbsp;{label}
        </span>
    )
}

export default GlowingBadge