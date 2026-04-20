import React, { useState } from 'react'
import { MdOutlineCheck } from 'react-icons/md'
import { Field, FieldDescription, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

type ChipProps = {
    option: string
    selected: string[]
    handleSelect: (option: string, isSelected: boolean) => void
}

const Chip = ({
    option,
    selected,
    handleSelect
}: ChipProps) => {
    const isSelected = selected?.includes(option)

    return (
        <div 
            className={`flex items-center border p-2 rounded-full text-subtle w-fit hover:border-blue-400 duration-300 transition-all cursor-pointer ${isSelected && "border-blue-400"}`}
            onClick={() => handleSelect(option, isSelected)}
        >
            {isSelected && <MdOutlineCheck size={20} className="text-white bg-blue-500 p-1 rounded-full mb-auto"/>}
            <span className='mx-1.5'>{option}</span>
        </div>
    )
}

const FeatureTwo = () => {
    const [selected, setSelected] = useState<string[]>(["Revenue", "Users"])

    const handleSelect = (option: string, isSelected: boolean) => {
        if (isSelected) {
            const newSelected = new Set(selected.filter((o) => o !== option))
            return setSelected([...newSelected])
        }

        return setSelected(selected.length ? [...new Set([...selected, option])] : [option])
    }

    return (
        <div className="w-full h-full flex flex-col gap-[16px]">
            <Field>
                <FieldLabel htmlFor="metrics" className="text-subtle">Metrics</FieldLabel>
                <div className='flex flex-wrap gap-[8px]'>
                    {
                        ["Revenue", "Users", "Conversions", "Page Views", "Bounce Rate", "Sessions"].map((option) => (
                            <Chip 
                                option={option} 
                                selected={selected}
                                handleSelect={handleSelect}
                            />
                        ))
                    }
                </div>
            </Field>
            <Field>
                <FieldLabel htmlFor="picture" className="text-subtle">Dashboard Cover</FieldLabel>
                <div className='bg-gray-50 h-[150px] p-[16px] rounded-lg flex flex-col gap-[8px] justify-center items-center border border-dashed'>
                    <Input id="picture" type="file" className='bg-white w-1/2'/>
                    <FieldDescription>Upload a cover image for your dashboard.</FieldDescription>
                </div>
            </Field>
        </div>
    )
}

export default FeatureTwo