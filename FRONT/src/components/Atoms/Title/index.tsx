import { ComponentProps, ReactNode } from "react";
import { VariantProps, tv } from 'tailwind-variants';

const title = tv({
  base: 'text-center',
  variants: {
    color: {
      light: "text-gray-500",
      normal: "text-gray-700",
      dark: "text-gray-900",
      primary: "text-amber-500"
    },
    size: {
      lg: "lg:text-lg text-base",
      xl: "lg:text-xl text-lg",
      xxl: "lg:text-2xl text-xl",
      xxxl: "lg:text-3xl text-xl",
      xxxxl: "lg:text-4xl text-3xl",

    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    },

  }
})

type TVariants = 'h1' | 'h2' | 'h3'

export type TTitleColors = "light" | "normal" | "dark" | "primary" | undefined

export type TTitleProps = ComponentProps<'h1'> & VariantProps<typeof title> & {
  children: ReactNode
  variant?: TVariants
}

export function Title({ children, variant = 'h2', color = "light", size, weight = 'medium', ...props }: TTitleProps) {
  switch (variant) {
    case 'h1':
      return (
        <div>
          <h1 {...props} className={title({ color, size, weight, class: props.className })}>{children}</h1>
        </div>
      )
    case 'h3':
      return (
        <div>
          <h3 {...props} className={title({ color, size, weight, class: props.className })}>{children}</h3>
        </div>
      )
    default:
      return (
        <div>
          <h2 {...props} className={title({ color, size, weight, class: props.className })}>{children}</h2>
        </div>
      )
  }
}