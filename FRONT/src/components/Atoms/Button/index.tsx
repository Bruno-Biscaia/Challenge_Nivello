import { ComponentProps, ReactNode } from "react"
import { VariantProps, tv } from "tailwind-variants"
import Spinner from '../Spinner'

const button = tv({
  base: 'flex justify-center items-center w-full gap-x-1.5 rounded-md p-3 text-sm border-solid border-1 border-cerise-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  variants: {
    colors: {
      primary: 'bg-amber-500 text-gray-800 hover:bg-amber-400 hover:text-gray-600 focus-visible:outline-amber-50',
      disabled: 'bg-amber-100 text-amber-500 hover:bg-amber-200 hover:text-amber-600 cursor-not-allowed',
    },
    font: {
      normal: 'font-normal tracking-wide',
      semibold: 'font-semibold',
      medium: 'font-medium'
    },
    size: {
      sm: "text-xs",
      md: "text-md",
    },
  }
})

export type TButtonProps = VariantProps<typeof button> & ComponentProps<'button'> & {
  children?: ReactNode
  loading?: boolean
}

function Button({ children, colors = 'primary', font = 'normal', size, loading, ...props }: TButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={button({ colors, font, size, class: props.className })}
    >
      {loading ?
        <Spinner />
        :
        <>
          {children}
        </>
      }
    </button>
  )
}

export default Button