import { VariantProps, tv } from "tailwind-variants";
import { InputSelect, TInputSelectProps, TOptionsProps } from '../../Atoms/InputSelect';

const inputContentSelect = tv({
  base: 'text-gray-500'  
})

type TInputContentSelectProps = TInputSelectProps & VariantProps<typeof inputContentSelect> & {
  listOptions?: Array<TOptionsProps>
}

export function InputContentSelect({listOptions, ...props}: TInputContentSelectProps) {
  return(
    <div className='flex justify-between'>
      <InputSelect {...props} className={inputContentSelect()} listOptions={listOptions} />
    </div>
  )
}