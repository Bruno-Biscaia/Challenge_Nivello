import { ComponentProps, ReactNode } from "react"

type TInputContentRootProps = ComponentProps<'div'> & {
  children: ReactNode
}

export function InputContentRoot({children, ...props}: TInputContentRootProps){
  return (
    <div {...props} className='w-full mb-6 '>
      {children}
    </div>
  )
}