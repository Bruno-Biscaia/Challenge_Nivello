import { ComponentProps, ReactNode } from 'react';
import { VariantProps, tv } from "tailwind-variants";

const containerPrivate = tv({
  base: 'w-full bg-transparent',
})

type TContainerPrivateProps = VariantProps<typeof containerPrivate> & ComponentProps<'div'> & {
  children: ReactNode;
};

export default function ContainerPrivate({ children, ...props }: TContainerPrivateProps) {
  return (
    <>
      <div {...props}
        className={containerPrivate({ class: props.className })}>
        {children}
      </div>
    </>
  );
}