import { Field, FieldLabel } from '../ui/field'
import DatePicker from '../ui/DatePicker'
import { Textarea } from '../ui/textarea'
import SelectDemo from '../ui/SelectDemo'

const FeatureThree = () => {
  return (
    <div className="w-full h-full flex flex-col gap-[16px]">
        <div className='flex gap-[16px]'>
            <Field>
                <FieldLabel htmlFor="date-required" className='text-subtle'>Sprint Start</FieldLabel>
                <DatePicker/>
            </Field>
            <Field>
                <FieldLabel htmlFor="date-required" className='text-subtle'>Sprint End</FieldLabel>
                <DatePicker/>
            </Field>
        </div>
        <Field>
            <FieldLabel htmlFor="select" className='text-subtle'>Channel</FieldLabel>
            <SelectDemo/>
        </Field>
        <Field>
            <FieldLabel htmlFor="textarea-message" className='text-subtle'>Project Brief</FieldLabel>
            <Textarea id="textarea-message" placeholder="Describe your project goals and key milestones..." />
        </Field>
    </div>
  )
}

export default FeatureThree