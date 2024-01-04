
import { ComponentProps } from "react"
import { VariantProps, tv } from "tailwind-variants"

const inputSelect = tv({
  base: 'block w-full text-sm p-2.5 pr-10 border text-gray-500 rounded-lg focus:ring-amber-500 focus:border-amber-500',
  variants: {
    hoverColor: {
      normal: "",
      primary: "hover: bg-amber-500 text-white"
    },
    typeInput: {
      normal: "",
      disabled: "bg-gray-100 text-gray-500 cursor-not-allowed"
    }
  }
})

export type TOptionsProps = {
  key?: string | number
  label: string
  value: string | number
  hoverColor?: string
  typeInput?: string
}

export type TInputSelectProps = ComponentProps<'select'> & VariantProps<typeof inputSelect> & {
  listOptions?: Array<TOptionsProps>
  values?: string | number | readonly string[] | undefined
}

export function InputSelect({ values, listOptions = [], hoverColor = "primary", typeInput, ...props }: TInputSelectProps) {
  return (
    <select
      {...props}
      className={inputSelect({ typeInput, class: props.className })}
      defaultValue={values}
    >
      {
        listOptions?.map((item, index) => (
          <option key={index} value={item.value}>
            <span className={inputSelect({ hoverColor, class: props.className })}> {item.label}</span>
          </option>
        ))
      }
    </select>
  )
}
