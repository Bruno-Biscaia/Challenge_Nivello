import { ComponentProps, ReactNode } from "react"
import { VariantProps, tv } from "tailwind-variants"

const card = tv({
  base: 'rounded-xl bg-white shadow-xl p-6',
  variants: {  
  }
})

export type TCardProps = VariantProps<typeof card> & ComponentProps<'div'> & {
  children: ReactNode
}

export function Card({children, ...props}: TCardProps) {
  return(
    <div {...props} className={card({class: props.className})}>
      {children}
    </div>
  )
}