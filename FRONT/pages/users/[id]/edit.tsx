// pages/users/[id]/edit.js
import { TGetUserResponse } from '@/models/Types/TUserService';
import { useApp } from '@/models/contexts/AppContext';
import { validateFullName } from '@/models/utils/regex';
import { getInitials } from '@/models/utils/strings';
import { userService } from '@/service/UserService';
import Button from '@/src/components/Atoms/Button';
import { Card } from '@/src/components/Atoms/Card';
import { TOptionsProps } from '@/src/components/Atoms/InputSelect';
import { Title } from '@/src/components/Atoms/Title';
import InputContent from '@/src/components/Molecules/InputContent';
import LayoutPrivate from '@/src/components/Templates/LayoutPrivate';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ArrowCircleLeft } from 'heroicons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TfiSave } from "react-icons/tfi";
import React, { use, useEffect, useState } from 'react';
import { filterRolesByRoleId } from '@/models/utils/selectRoles';
import { withAuth } from '@/src/hoc/withAuth';

const EditUserPage = () => {
    //Estados do contexto
    const { rolesContext, userLoggedData, setAlertContext, alertContext } = useApp();
    const router = useRouter();
    const { id } = router.query;  

    //Estados para carregar 
    const [loading, setLoading] = useState(false)

    //Estado para habilitar/desabilitar botão
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    //Busca as informaçoes do usuário a ser editado
    const [userEdit, setUserEdit] = useState<TGetUserResponse>()
    async function getUserEdit(userId: string) {
        try {
            const userEdit = await userService.getUserById(userId);
            setRoleId(userEdit.roleId);
            setFullName(userEdit.fullName);
            setEmail(userEdit.email);
            setUserEdit(userEdit);
        } catch (error: any) {
            setAlertContext({
                show: true,
                title: "Erro ao buscar usuário!",
                message: `${error.message}`,
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    }

    const handleBack = () => {
        router.push('/users');
    };

    //Estado que verifica se usuário logado é igual ao usuário editado
    const [isSameUser, setIsSameUser] = useState(false)

    //Estados que controlam exibiçao e ediçao dos dados do usuário para edição
    const [email, setEmail] = useState<string | undefined>(userEdit?.email);
    const [roleId, setRoleId] = useState<any>(isSameUser ? userEdit?.roleName : userEdit?.roleId);
    const [fullName, setFullName] = useState<string | undefined>(userEdit?.fullName);
    const [isValidFullNamel, setIsValidFullNamel] = useState(true);
    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputFullName = e.target.value;
        setFullName(inputFullName);
        setIsValidFullNamel(validateFullName(inputFullName));
    };

    //Monta Lista e Level do select de roles para cadastro e edição
    const optionsRole = filterRolesByRoleId(userLoggedData?.roleId, rolesContext)?.map((role, index) => {
        return {
            key: index,
            value: role.id,
            label: `${role.roleName}`,
        } as TOptionsProps;
    });

    //Funçao para edição de usuário
    async function editUser(userId: any, userLoggedId: string, fullName: string, roleId: number) {
        setLoading(true);
        try {
            await userService.editUser(userId, userLoggedId, fullName, roleId);
            setAlertContext({
                show: true,
                title: "Edição salva com sucesso!",
                message: `As alteraçoes realizadas, foram salvas com sucesso.`,
                type: "success"
            });
            handleBack()
        } catch (error: any) {
            setAlertContext({
                show: true,
                title: "Erro ao salvar a ediçao!",
                message: `${error.message}`,
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserEdit(id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alertContext])


    useEffect(() => {        
        if (id && userLoggedData) {
            if (id === userLoggedData.id || optionsRole.length == 0 || roleId >= userLoggedData.roleId) {
                setIsSameUser(true);
            } else {
                setIsSameUser(false);
            }
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Verifica se algum dos campos está vazio ou se algum dos estados de validação é falso
        if (
            !fullName ||
            !email ||
            !isValidFullNamel
        ) {
            setIsButtonDisabled(true); // Se algum deles for verdadeiro, desabilita o botão
        } else {
            setIsButtonDisabled(false); // Se todos os campos estiverem preenchidos e válidos, habilita o botão
        }
    }, [fullName, email, isValidFullNamel]);

    return (
        <LayoutPrivate>
            <div className="max-w-screen-xl flex-col justify-between p-8 mx-auto">
                <div className="flex items-center gap-3">
                    <Link href='/users'>
                        <Title className="p-0 m-0" size='lg' weight='normal' color='dark'>
                            Usuários
                        </Title>
                    </Link>
                    <ChevronRightIcon className='w-5 h-5' />
                    <Title className="p-0 m-0 underline" size='xl' weight='medium' color='dark'>
                        Editar
                    </Title>
                </div>
                <hr className="my-2 border-gray-300" />
                <Card className="max-w-xl mx-auto my-6 bg-white border border-gray-200 rounded-lg shadow p-6">
                    <Link href="/users">
                        <ArrowCircleLeft className=' w-10 h-10 cursor-pointer text-amber-500' />
                    </Link>
                    <div className='flex justify-center'>
                        <div className="flex flex-col items-center w-[600px]">
                            <div className="my-3 relative flex items-center justify-center w-20 h-20 overflow-hidden bg-amber-500 rounded-full">
                                <span className="font-medium items-center flex justify-center text-3xl text-gray-100">{getInitials(userEdit?.fullName || "")}</span>
                            </div>
                            <div className='text-center mb-4'>
                                <h5 className=" text-xl font-medium text-gray-900">{userEdit?.fullName}</h5>
                                <span className="text-sm text-gray-500">{userEdit?.roleName}</span>
                            </div>
                            <InputContent.Root>
                                <InputContent.Label size='sm' weight="normal" color='normal'>{'Nome Completo'}</InputContent.Label>
                                <InputContent.Input value={fullName} onChange={handleFullNameChange} />
                                {!isValidFullNamel && <InputContent.Validation message='O nome não deve conter números ou caracteres especiais.' validationType='error' />}
                            </InputContent.Root>
                            <InputContent.Root>
                                <InputContent.Label className='mb-1' size='sm' weight="normal" color='normal'>{"Email"}</InputContent.Label>
                                <InputContent.Input value={email} typeInput='disabled' onChange={(e) => setEmail(e.target.value)} />
                            </InputContent.Root>
                            <InputContent.Root>
                                <InputContent.Label className='mb-1' size='sm' weight="normal" color='normal'>{"Função"}</InputContent.Label>
                                {isSameUser ?
                                    <InputContent.Input disabled typeInput='disabled' value={userEdit?.roleName} />
                                    :
                                    <InputContent.Select
                                        disabled={isSameUser ? true : false}
                                        typeInput={isSameUser ? "disabled" : "normal"}
                                        listOptions={optionsRole}
                                        value={roleId}
                                        onChange={(e) => setRoleId(Number(e.target.value))}
                                    />
                                }
                            </InputContent.Root>
                            <Button
                                disabled={isButtonDisabled}
                                colors={isButtonDisabled ? "disabled" : "primary"}
                                loading={loading}
                                onClick={() => editUser(id as string, userLoggedData?.id, fullName as string, Number(roleId))}
                                className='my-3'

                                size='md'
                                font='semibold'
                            >
                                <TfiSave className='h-4 w-4 gap-2' />
                                Salvar
                            </Button>

                        </div>
                    </div>
                </Card>
            </div>
        </LayoutPrivate>
    );
};

export default withAuth(EditUserPage);