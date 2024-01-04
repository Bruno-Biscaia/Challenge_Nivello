import { ComponentProps } from "react";
import { VariantProps, tv } from "tailwind-variants";

const input = tv({
    base: 'p-3 bg-white border border-gray-300 text-sm rounded w-full',
    variants: {
        typeInput: {
            normal: "",
            disabled: "bg-gray-100 text-gray-500 cursor-not-allowed",
            filter: "block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        },
    }
})

export type TInputProps = ComponentProps<'input'> & VariantProps<typeof input> & {
    type?: string
}

export function Input({ typeInput, ...props }: TInputProps) {
    return (
        <input {...props} className={input({ typeInput, class: props.className })} />
    )
}