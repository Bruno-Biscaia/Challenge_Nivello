/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '@/models/contexts/AppContext';
import { Dropdown, DropdownItem, Tooltip } from 'flowbite-react';
import { HiCog, HiLogout, HiViewGrid } from 'react-icons/hi';
import Link from 'next/link';
import { getInitials } from '@/models/utils/strings';
import { Card } from '../../Atoms/Card';
import ModalComponent from '../../Atoms/ModalComponent';
import InputContent from '../../Molecules/InputContent';
import { logout } from '@/models/utils/logout';
import { FaUserEdit, FaUsers } from "react-icons/fa";
import { Bars3Icon } from '@heroicons/react/20/solid';

export default function NavBar() {
  //Estados do Contexto
  const { userLoggedData } = useApp();
  const router = useRouter();

  //Estado que controla abertura do modal da tela de perfil
  const [openModal, setOpenModal] = useState(false)

  //Estado que controla abertura do dropdown do menu sanduíche
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Menus e Rotas
  const menus = [
    { label: 'Dashboard', href: '/dashboard', icon: HiViewGrid },
    { label: 'Usuários', href: '/users', icon: FaUsers }
  ];

  //Estado que define qual menu está ativo
  const [activeMenu, setActiveMenu] = useState('');
  // Atualiza o estado do menu ativo com base na rota atual
  useEffect(() => {
    const currentMenu = menus.find(menu => router.pathname.startsWith(menu.href));
    setActiveMenu(currentMenu?.label || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav className="bg-gray-800 shadow">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3">
            {/* Menu Sanduíche */}
            <div className="md:hidden">
              <button className='hidden' onClick={handleDropdownToggle} ></button>
              <Dropdown
                label={
                  <div className='flex items-center'>
                    <Bars3Icon className="inline-flex items-center w-6 h-6 justify-start text-sm text-gray-100 rounded-lg focus:outline-none focus:ring-2 cursor-pointer" />
                  </div>
                }
                inline
                arrowIcon={false}
              >
                {menus.map(menu => (
                  <div key={menu.label}>
                    <DropdownItem
                      onClick={() => router.push(menu.href)}
                      icon={menu.icon}
                      className='hover:bg-amber-500 hover:text-white hover:font-medium gap-2'
                    >
                      {menu.label}
                    </DropdownItem>
                  </div>
                ))}
              </Dropdown>
            </div>

            <Link href="https://nivello.com.br" target='_blank'>
              <div className="flex items-center space-x-3">
                <img src="https://b2clubstorage.blob.core.windows.net/shared/images/logo/nivello-removebg.png" className="h-8 w-8" alt="Nivello Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Nivello</span>
              </div>
            </Link>

          </div>

          {/* Menu Principal - Desktop */}
          <div className="hidden md:flex md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-800 md:bg-gray-800 border-gray-800">
              {menus.map(menu => (
                <li key={menu.label}>
                  <Link
                    className={`block py-2 px-3 ${activeMenu === menu.label ? 'text-amber-400' : 'text-white'} rounded md:bg-transparent md:p-0`}
                    href={menu.href}
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dropwdow do menu do usuário */}
          <div className="flex md:order-2 space-x-3">
            <Dropdown label={
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-amber-500 hover:bg-amber-400 rounded-full">
                <span className="font-medium text-gray-800 hover:text-white">{getInitials(userLoggedData?.fullName)}</span>
              </div>}
              inline
              arrowIcon={false}
            >
              <Dropdown.Header>
                <span className="block text-base font-medium">{userLoggedData?.fullName}</span>
                <span className="block truncate text-sm font-normal">{userLoggedData?.email}</span>
              </Dropdown.Header>
              <Dropdown.Divider />
              <DropdownItem href='/dashboard' icon={HiViewGrid} className='hover:bg-amber-500 hover:text-white hover:font-medium gap-2'>Dashboard</DropdownItem>
              <DropdownItem onClick={() => setOpenModal(true)} icon={HiCog} className='hover:bg-amber-500 hover:text-white hover:font-medium gap-2'>Perfil</DropdownItem>
              <Dropdown.Divider />
              <DropdownItem icon={HiLogout} onClick={logout} className='hover:bg-amber-500 hover:text-white hover:font-medium gap-2'>Sign out</DropdownItem>
            </Dropdown>
          </div>
        </div>
      </nav>

      <ModalComponent titleModalColors="primary" title='Prefil do Usuário' openModal={openModal} setOpenModal={setOpenModal} >
        <Card className="w-full mx-auto mb-10 bg-white border border-gray-200 rounded-lg shadoww">
          <div className="flex flex-col items-center ">
            <div className="m-0 p-0 my-3 relative flex items-center justify-center w-20 h-20 overflow-hidden bg-amber-500 rounded-full">
              <span className="m-0 p-0 font-medium items-center flex justify-center text-3xl text-gray-100">{getInitials(userLoggedData?.fullName)}</span>
            </div>
            <div className='text-center mb-4'>
              <h5 className=" text-xl font-medium text-gray-900">{userLoggedData?.fullName}</h5>
              <span className="text-base text-gray-500 text-center">
                {userLoggedData?.roleName}
              </span>
              <div className='flex text-center justify-center'>
                <Link href={`/users/${userLoggedData?.id}/edit`}>
                  <Tooltip style='light' arrow={false} content="Clique para editar seus dados">
                    <div className="text-orange-500 hover:text-orange-400 cursor-pointer text-center mt-3">
                      <FaUserEdit className='h-10 w-10 text-center ' />
                    </div>
                  </Tooltip>
                </Link>
              </div>
            </div>
            <InputContent.Root>
              <InputContent.Label size='sm' weight="normal" color='normal'>{'Nome Completo'}</InputContent.Label>
              <InputContent.Input className='bg-gray-100 text-gray-500 cursor-not-allowed' disabled value={userLoggedData?.fullName} />
            </InputContent.Root>
            <InputContent.Root>
              <InputContent.Label className='mb-1' size='sm' weight="normal" color='normal'>{"Email"}</InputContent.Label>
              <InputContent.Input className='bg-gray-100 text-gray-500 cursor-not-allowed' disabled type='disabled' value={userLoggedData?.email} />
            </InputContent.Root>
            <InputContent.Root>
              <InputContent.Label className='mb-1' size='sm' weight="normal" color='normal'>{"Função"}</InputContent.Label>
              <InputContent.Input disabled typeInput='disabled' value={userLoggedData?.roleName} />
            </InputContent.Root>
          </div>
        </Card>
      </ModalComponent>
    </>
  );
}
