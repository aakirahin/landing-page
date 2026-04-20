import React from 'react'

type Props = { 
    img?: boolean
    icon?: React.ReactNode
    label: string
    className?: string
}

const Button = ({
    img = false,
    icon,
    label,
    className
}: Props) => {
    return (
        <button className={`btn-base ${img ? "pl-[8px] pr-[16px] py-[8px] gap-2" : "px-[16px] py-[12px]"} ${className} text-[14px]`}>
            {icon}
            {label}
        </button>
    )
}

export default Button