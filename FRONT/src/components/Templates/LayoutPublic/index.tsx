import { ReactNode } from 'react';
import ContainerPublic from '../../Organisms/ContainerPublic';

type TLayoutPublicProps = {
    children: ReactNode
}

export default function LayoutPublic({ children }: TLayoutPublicProps) {
    return (
        <ContainerPublic>
            {children}
        </ContainerPublic>
    );
}