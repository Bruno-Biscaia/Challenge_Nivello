import { ReactNode } from 'react';

type TContainerPublicProps = {
  children: ReactNode;
};

export default function ContainerPublic({ children }: TContainerPublicProps) {
  return (
    <div className="flex flex-col w-full min-h-screen gap-6">      
      <div className="flex-1 flex items-center justify-center">               
          {children}       
      </div>
    </div>
  );
}