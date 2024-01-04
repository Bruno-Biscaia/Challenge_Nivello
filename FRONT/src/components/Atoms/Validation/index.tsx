import { ComponentProps } from "react"
import { VariantProps, tv } from "tailwind-variants"

const validation = tv({
  base: 'mt-2 text-sm block text-right',
  variants: {
    color: {
      normal: "text-gray-400",
      error: "text-red-500",
      success: "text-green-600"
    },
    size: {
      xs: "lg:text-xs text-xs",
      sm: "lg:text-sm text-xs",
      md: "lg:text-base text-sm",
      lg: "lg:text-lg text-base",
    }
  }
})

export type TValidationProps = ComponentProps<'span'> & VariantProps<typeof validation> & {
  children?: string
}

export function Validation({ children = '', color, size, ...props }: TValidationProps) {
  return (
    <span {...props} className={validation({ color, size, class: props.className })}>
      {children}
    </span>
  )
}