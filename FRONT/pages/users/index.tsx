

import { TGetUserListByRoleIdResponse } from '@/models/Types/TUserService';
import { useApp } from '@/models/contexts/AppContext';
import { validateEmail, validateFullName, validatePassword } from '@/models/utils/regex';
import { userService } from '@/service/UserService';
import Button from '@/src/components/Atoms/Button';
import { Card } from '@/src/components/Atoms/Card';
import { TOptionsProps } from '@/src/components/Atoms/InputSelect';
import ModalComponent from '@/src/components/Atoms/ModalComponent';
import Notifications from '@/src/components/Atoms/Notifications';
import { Paragraph } from '@/src/components/Atoms/Paragraph';
import { Title } from '@/src/components/Atoms/Title';
import InputContent from '@/src/components/Molecules/InputContent';
import LayoutPrivate from '@/src/components/Templates/LayoutPrivate';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'flowbite-react';
import Link from 'next/link';
import { FaUserEdit } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { filterRolesByRoleId } from '@/models/utils/selectRoles';
import { withAuth } from '@/src/hoc/withAuth';

function Users() {
  //Estados do contexto
  const { alertContext, setAlertContext, userId, userLoggedData } = useApp();

  //Estados que habilita/desabilita botão com base na validação
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  //Estados para carregar 
  const [loading, setLoading] = useState(false)

  //Estado Modal
  const [openModal, setOpenModal] = useState(false)

  //Estado que controla lista de dados dos usuários 
  const [userData, setUserData] = useState<TGetUserListByRoleIdResponse[]>();

  // -> Referente ao select de roles:
  // Lista de Roles sendo 
  const { rolesContext } = useApp();

  //Monta Lista e Level do select de roles para cadastro e ediçao
  const optionsRole = filterRolesByRoleId(userLoggedData?.roleId, rolesContext)?.map((role, index) => {
    return {
      key: index,
      value: role.id,
      label: `${role.level} - ${role.roleName}`,
    } as TOptionsProps;
  });

  // -> Estados que controlam os inputs do cadastro de novos usuários:
  //Estado RoleId
  const [roleId, setRoleId] = useState<any>(1)

  //Estado e validaçoes do Input de Nome
  const [fullName, setFullName] = useState<string>("");
  const [isValidFullNamel, setIsValidFullNamel] = useState(true);
  const handleFullNameChange = (e: any) => {
    const inputFullName = e.target.value;
    setFullName(inputFullName);
    setIsValidFullNamel(validateFullName(inputFullName));
  };

  //Estados e validaçoes do Input de Email
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const handleEmailChange = (e: any) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValidEmail(validateEmail(inputEmail));
  };

  //Estados e validaçoes do Input de Senha
  const [mainPassword, setMainPassword] = useState<string>("");
  const [isValidMainPassword, setIsValidMainPassword] = useState(true);
  const handlePasswordChange = (e: any) => {
    const inputPassword = e.target.value;
    setMainPassword(inputPassword);
    setIsValidMainPassword(validatePassword(inputPassword));
  };

  //Colunas da table de lista de usuários
  const columnsUsersTable = ["Nome", "E-mail", "Funções", ""];

  //Funçao para buscar lista de usuários
  async function getUserList(userId?: string, roleId?: number) {
    try {
      const userList = await userService.getUserListByRoleId(userId, roleId);
      setUserData(userList);
    }
    catch (error: any) {
      setAlertContext({
        show: true,
        title: "Não foi possível carregar a lista",
        message: `${error.message}`,
        type: "error"
      });
    }
  }

  //Funçao para cadastro de novo usuário
  async function registerUser(userId: any, fullName: string, email: string, roleId: number, mainPassword: string) {
    setLoading(true);
    try {
      await userService.createUser(userId, fullName, email, roleId, mainPassword);
      setAlertContext({
        show: true,
        title: "Cadastro concluído",
        message: `O usuário ${fullName} foi cadastrado com sucesso!`,
        type: "success"
      });
      setOpenModal(false);
      getUserList()
    } catch (error: any) {
      setAlertContext({
        show: true,
        title: "Cadastro não concluído",
        message: `${error.message}`,
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Verifica se algum dos campos está vazio ou se algum dos estados de validação é falso para habilitar botão
    if (
      !fullName ||
      !email ||
      !mainPassword ||
      !isValidFullNamel ||
      !isValidEmail ||
      !isValidMainPassword
    ) {
      setIsButtonDisabled(true); // Se algum deles for verdadeiro, desabilita o botão
    } else {
      setIsButtonDisabled(false); // Se todos os campos estiverem preenchidos e válidos, habilita o botão
    }
  }, [fullName, email, mainPassword, isValidFullNamel, isValidEmail, isValidMainPassword]);

  useEffect(() => {
    if (userId !== null) {
      getUserList(userId, roleId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LayoutPrivate>
      <Notifications
        title={alertContext.title}
        message={alertContext.message}
        typeAlert={alertContext.type}
        show={alertContext.show}
      />

      <ModalComponent titleModalColors="primary" title='Cadastro de Usuário' openModal={openModal} setOpenModal={setOpenModal}>
        <Notifications
          title={alertContext.title}
          message={alertContext.message}
          typeAlert={alertContext.type}
          show={alertContext.show}
        />
        <Card className="bg-white border border-gray-200 rounded-lg shadow ">
          <div className="flex flex-col items-center ">
            <InputContent.Root>
              <InputContent.Label size='sm' weight="normal" color='normal'>{'Nome Completo'}</InputContent.Label>
              <InputContent.Input value={fullName} onChange={handleFullNameChange} />
              {!isValidFullNamel && <InputContent.Validation message='O nome não deve conter números ou caracteres especiais.' validationType='error' />}
            </InputContent.Root>
            <InputContent.Root>
              <InputContent.Label className='mb-1' size='sm' weight="normal" color='normal'>{"Email"}</InputContent.Label>
              <InputContent.Input required value={email} onChange={handleEmailChange} />
              {!isValidEmail && <InputContent.Validation message='Email Inválido' validationType='error' />}
            </InputContent.Root>
            <InputContent.Root>
              <InputContent.Label className='mb-1' size='sm' weight="normal" color='normal'>{"Senha"}</InputContent.Label>
              <InputContent.Input maxLength={6} value={mainPassword} onChange={handlePasswordChange} inputType='password' />
              {!isValidMainPassword && <InputContent.Validation message='A senha deve conter apenas números e ter no máximo 6 caracteres.' validationType='error' />}
            </InputContent.Root>
            <InputContent.Root>
              <InputContent.Label className='mb-1' size='sm' weight="normal" color='normal'>{"Função"}</InputContent.Label>
              <InputContent.Select listOptions={optionsRole} value={roleId} onChange={(e) => setRoleId(e.target.value)} />
            </InputContent.Root>
            <Button
              disabled={isButtonDisabled}
              colors={isButtonDisabled ? "disabled" : "primary"}
              loading={loading}
              onClick={() => registerUser(userId, fullName, email, roleId, mainPassword)}
              className=''
              size='md'
              font='medium'
            >
              Cadastrar
            </Button>
          </div>
        </Card>
      </ModalComponent>

      <div className="max-w-screen-xl flex-col justify-between mx-auto">
        <div className="my-8 mx-4 sm:mx-8">
          <Title className='text-start' size='xl' weight='semibold' color='dark'>Usuários</Title>
          <hr className="my-2 border-gray-300" />
          <Paragraph className='mt-2 text-start' size='sm' color='normal'>{"Lista de todos os usuários cadastrados, incluindo nome, e-mail e função"}</Paragraph>
        </div>
        <div className="mx-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className='flex md:justify-end mb-3 '>
                <Button onClick={() => setOpenModal(true)} className='w-auto' font='medium' colors='primary'>
                  <PlusCircleIcon className='h-6 w-6' />
                  Criar Usuário
                </Button>
              </div>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-700 p-3">
                  <thead className="bg-gray-800">
                    <tr>
                      {columnsUsersTable.map((column, index) => (
                        <th key={index} scope="col" className="text-sm font-semibold text-amber-500 py-3 ">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700 bg-gray-800">
                    {userData?.map((person, index) => {
                      // Evita que usuário logado apareça na lista de cadastros, obrigando ele a editar seu perfil pela tela de profile
                      if (person.id !== userId) {
                        return (
                          <tr key={person.id} className='text-center'>
                            <td className="whitespace-nowrap text-sm font-medium text-white p-4">{person.fullName}</td>
                            <td className="whitespace-nowrap text-sm text-white p-4">{person.email}</td>
                            <td className="whitespace-nowrap text-sm text-white p-4">{person.roleName}</td>
                            <td className="flex justify-center relative p-4 gap-6">
                              <Link href={`/users/${person.id}/edit`}>
                                <Tooltip style='light' arrow={false} content="Editar Usuário">
                                  <div className="text-orange-500 hover:text-orange-400 cursor-pointer flex ">
                                    <FaUserEdit className='h-8 w-8 text-center' />
                                  </div>
                                </Tooltip>
                              </Link>
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutPrivate>
  )
}

export default withAuth(Users);