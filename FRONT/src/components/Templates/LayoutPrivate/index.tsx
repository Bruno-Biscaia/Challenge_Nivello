
import Navbar from '@/src/components/Organisms/NavBar';
import { ReactNode } from 'react';
import ContainerPrivate from '../../Organisms/ContainerPrivate';
import Footer from '../../Organisms/Footer/Footer';

type TLayoutPrivateProps = {
    children: ReactNode
}

export default function LayoutPrivate({ children }: TLayoutPrivateProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <ContainerPrivate className="flex-1">
                <Navbar />
                {children}
            </ContainerPrivate>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}