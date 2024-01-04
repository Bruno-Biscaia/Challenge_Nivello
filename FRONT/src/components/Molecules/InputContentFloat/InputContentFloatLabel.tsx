import { ReactNode } from 'react'
import { Label, TLabelProps } from '../../Atoms/Label'

type TInputContentFloatLabelProps = TLabelProps & {
  children: ReactNode | string
  htmlForLink?: string
}

export function InputContentFloatLabel({ children, htmlForLink = 'input', ...props }: TInputContentFloatLabelProps) {
  return (
    <Label
      {...props}
      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      htmlFor={htmlForLink}
    >
      {children}
    </Label>
  )
}