import { ComponentProps } from "react"
import { VariantProps, tv } from "tailwind-variants"

const image = tv({
  base: '',
})

export type TImageProps = ComponentProps<'img'> & VariantProps<typeof image> & {
  src: string
}

function Image({ src, ...props }: TImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={props.alt} src={src} className={image({class: props.className})} />
  )
}

export default Image