import { ReactNode } from 'react'
import { Label, TLabelProps } from '../../Atoms/Label'

type TInputContentLabelProps = TLabelProps & {
  children?: ReactNode | string
  htmlForLink?: string
}

export function InputContentLabel({children = '', htmlForLink = 'input' , ...props}: TInputContentLabelProps) {
  return (
    <Label {...props}  htmlForLink={htmlForLink}>{children}</Label>
  )
}