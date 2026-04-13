import React from 'react'
import { buttonClass } from '../../utils/tailwindClasses'

type Props = { 
    img: boolean
    icon?: React.ReactNode
    label: string
    className?: string
}

const Button = ({
    img,
    icon,
    label,
    className
}: Props) => {
    return (
        <button className={`${buttonClass} ${img ? "pl-[8px] pr-[16px] py-[8px] gap-2" : "px-[16px] py-[12px]"} ${className}`}>
            {icon}
            {label}
        </button>
    )
}

export default Button