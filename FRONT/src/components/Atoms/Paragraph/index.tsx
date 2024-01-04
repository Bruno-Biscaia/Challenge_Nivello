import { ComponentProps, ReactNode } from "react";
import { VariantProps, tv } from 'tailwind-variants';

const paragraph = tv({
  base: 'my-6 text-center',
  variants: {
    color: {
      normal: "text-gray-700",
      dark: "text-gray-900"
    },
    size: {
      sm: "text-sm",
      xLarge: "sm:text-2xl text-xl"
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    }
  }
})

export type TParagraphProps = ComponentProps<'p'> & VariantProps<typeof paragraph> & {
  children: ReactNode
}

export function Paragraph({ children, color, size, weight = "normal", ...props }: TParagraphProps) {
  return <p {...props} className={paragraph({ color, size, weight, class: props.className })}>{children}</p>
}