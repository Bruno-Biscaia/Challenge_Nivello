import { Dispatch, ReactNode, SetStateAction } from 'react'
import { TTitleColors, Title } from '../Title';
import { Modal } from 'flowbite-react';

type TModalComponentProps = {
    openModal: boolean;
    title: string;
    titleModalColors?: TTitleColors;
    children: ReactNode;

    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function ModalComponent({ openModal, setOpenModal, title, titleModalColors, children }: TModalComponentProps) {
    return (
        <>
            <div className={`fixed inset-0 bg-gray-800 opacity-50 z-40 ${openModal ? 'block' : 'hidden'}`}></div>
            <Modal className='w-full xs:w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto my-10 z-40' show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className='p-4'>
                    <Title variant='h1' weight='semibold' size='lg' color={titleModalColors}>{title}</Title>
                </Modal.Header>
                <Modal.Body className="p-6">
                    {children}
                </Modal.Body>
            </Modal>
        </>
    )
}
