import { useState } from "react"
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { MdOutlineCheck } from "react-icons/md"
import { ComboboxMultiple } from "../ui/ComboboxMultiple"

type BoxProps = {
    id: string
    selected: string | null
    setSelected: (selected: string | null) => void
}

const Box = ({
    id,
    selected,
    setSelected
}: BoxProps) => {
    const isSelected = selected === id

    return (
        <div 
            className={`flex flex-col p-[16px] border w-full rounded-lg justify-end hover:border-blue-400 duration-300 transition-all cursor-pointer items-end ${isSelected && "border-blue-400"}`}
            onClick={() => setSelected(isSelected ? null : id)}
        >
            {isSelected && <MdOutlineCheck size={24} className="text-white bg-blue-500 p-1 rounded-full mb-auto"/>}
            <div className="flex flex-col w-full">
                <span className="font-medium text-[16px]">{id === "1" ? "Trigger-based" : "Scheduled"}</span>
                <span className="text-subtle">{id === "1" ? "Runs when an event occurs" : "Runs on a set schedule"}</span>
            </div>
        </div>
    )
}

const FeatureOne = () => {
    const [selected, setSelected] = useState<string | null>("1")

    return (
        <div className="w-full h-full flex flex-col gap-[16px]">
            <div className="flex gap-[16px] h-[120px]">
                {
                    [1, 2].map((id) => (
                        <Box
                            key={id}
                            id={String(id)}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    ))
                }
            </div>
            <Field>
                <FieldLabel htmlFor="name" className="text-subtle">Workflow Name</FieldLabel>
                <Input id="fieldgroup-name" placeholder="e.g. Weekly report generator"/>
            </Field>
            <Field>
                <FieldLabel htmlFor="tech" className="text-subtle">Trigger Apps</FieldLabel>
                <ComboboxMultiple/>
            </Field>
        </div>
    )
}

export default FeatureOne