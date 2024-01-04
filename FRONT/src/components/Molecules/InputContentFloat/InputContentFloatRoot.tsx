import { ComponentProps, ReactNode } from "react"

type TInputContentFloatRootProps = ComponentProps<'div'> & {
  children: ReactNode
}

export function InputContentFloatRoot({ children, ...props }: TInputContentFloatRootProps) {
  return (
    <div {...props} className="relative z-0 w-full my-8 group">
      {children}
    </div>
  )
}