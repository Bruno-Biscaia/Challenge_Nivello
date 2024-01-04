import { useEffect, useState } from 'react';
import { TGetUserListByRoleIdResponse } from '@/models/Types/TUserService';
import { useApp } from '@/models/contexts/AppContext';
import { userService } from '@/service/UserService';
import { Title } from '@/src/components/Atoms/Title';
import LayoutPrivate from '@/src/components/Templates/LayoutPrivate';
import { withAuth } from '@/src/hoc/withAuth';

function Dashboard() {
    //Estados do contexto
    const {userLoggedData, setAlertContext } = useApp();

    //Estado controla os dados do usuário
    const [userData, setUserData] = useState<TGetUserListByRoleIdResponse[]>();
    
    const summarys = [
        { name: 'Total de Usuários', value: `${userData?.filter((x) => x.roleId === 1).length}` },
        { name: 'Total Supervisores', value: `${userData?.filter((x) => x.roleId === 3).length}` },
        { name: 'Total Gestores', value: `${userData?.filter((x) => x.roleId === 4).length}` },
        { name: 'Total Administradores', value: `${userData?.filter((x) => x.roleId === 5 || x.roleId === 6).length}` }
    ];

    const summaryUser = [
        { name: 'Nome', value: `${userLoggedData?.fullName}` },
        { name: 'Email', value: `${userLoggedData?.email}` },
        { name: 'Função', value: `${userLoggedData?.roleName}` }
    ];

    //Funçao para buscar lista de usuários
    async function getUserList(userId?: string, roleId?: number) {
        try {
            const userList = await userService.getUserListByRoleId(userId, roleId);
            setUserData(userList);
        } catch (error: any) {
            setAlertContext({
                show: true,
                title: "Não foi possível carregar a lista",
                message: `${error.message}`,
                type: "error"
            });
        }
    }

    useEffect(() => {
        getUserList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <LayoutPrivate>
            <div className="max-w-screen-xl flex-col justify-between py-12 sm:px-6 lg:px-8 mx-auto">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <Title className="text-start" size='xl' weight='semibold' color='dark'>Dashboard</Title>
                        <hr className="my-2 border-gray-300" />
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg my-12 p-6">
                    <Title size='xxl' className='m-3 text-start' color='primary'>Meus dados</Title>
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
                            {summaryUser?.map((user) => (
                                <div key={user.name} className="bg-gray-800 px-4 py-6 sm:px-6 lg:px-8">
                                    <p className="text-lg font-medium leading-6 text-amber-500">{user.name}</p>
                                    <p className="mt-2 flex items-baseline gap-x-2">
                                        <span className="text-2xl font-semibold tracking-tight text-white">{user.value}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {userLoggedData?.roleId !== 1 ?
                    <div className="bg-gray-800 rounded-lg my-12 p-10">
                        <Title size='xxl' className='m-3 text-start' color='primary'>Resumo da Rede</Title>
                        <div className="mx-auto max-w-7xl">
                            <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4 mt-6">
                                {summarys?.map((summary) => (
                                    <div key={summary.name} className="bg-gray-800 px-4 py-6 sm:px-6 lg:px-8">
                                        <p className="text-lg font-medium leading-6 text-amber-500">{summary.name}</p>
                                        <p className="mt-2 flex items-baseline gap-x-2">
                                            <span className="text-5xl font-semibold tracking-tight text-white">{summary.value}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    : ""
                }
            </div>
        </LayoutPrivate>
    );
}

export default withAuth(Dashboard);