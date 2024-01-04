import { ComponentProps, ReactNode } from "react";
import { VariantProps, tv } from "tailwind-variants";

const label = tv({
    base: 'block ',
    variants: {
        color: {
            ligth: "text-gray-400",
            normal: "text-gray-500",
            dark: "text-gray-900",
        },
        size: {
            xs: "lg:text-xs text-xs",
            sm: "lg:text-sm text-xs",
            md: "lg:text-base text-sm",
            lg: "lg:text-lg text-base",
        },
        weight: {
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold"
        },
        bottomSpacing: {
            normal: '',
            noSpacing: 'm-0 p-0'
        }
    }
})

export type TLabelProps = ComponentProps<'label'> & VariantProps<typeof label> & {
    children: ReactNode | string
    color?: string
    size?: string
    htmlForLink?: string
}

export function Label({ children, htmlForLink, color, size = "sm", weight, ...props }: TLabelProps) {
    return (
        <label {...props} className={label({ color, size, weight, class: props.className })} htmlFor={htmlForLink}>
            {children}
        </label>)
}