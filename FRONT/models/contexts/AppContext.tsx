import { userService } from '@/service/UserService';
import { createContext, useContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { TGetRolesResponse } from '../Types/TRoleService';
import { RoleService } from '@/service/RoleService';

type TAppProviderProps = {
  children: ReactNode
}

type TAlertProps = {
  show: boolean;
  title: string;
  message: string;
  type: string;
}

type TAppContextProps = {
  userId: any;
  setUserId: (userId: string) => void;
  userLoggedData: any;
  setUserLoggedData: Dispatch<any>;
  alertContext: TAlertProps;
  setAlertContext: Dispatch<SetStateAction<TAlertProps>>;
  rolesContext: TGetRolesResponse[];
  setRolesContext: Dispatch<SetStateAction<TGetRolesResponse[]>>;
  handleAlert: (alertData: { title: string; message: string; type: string }) => void;
  isLoadingUser: boolean
  setIsLoadingUser: Dispatch<SetStateAction<boolean>>;
};


const AppContext = createContext<TAppContextProps | undefined>(undefined);

function AppProvider({ children }: TAppProviderProps) {
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  //UserId que faz autenticação
  const [userId, setUserId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId');
    }
    return null;
  });

  //Dados que retornam do usuário logado
  const [userLoggedData, setUserLoggedData] = useState<any>()
  async function getUserLoggedData(userId: string) {
    setIsLoadingUser(true);
    if (!userId) return;
    await userService.getUserById(userId).then(
      (userLogged) => {
        setUserLoggedData(userLogged);
        setIsLoadingUser(false);
      }
    ).catch(
      (error) => {
        setAlertContext({
          show: true,
          title: "Erro ao buscar usuário",
          message: `${error.message}`,
          type: "error"
        });
      }
    );
  }

  useEffect(() => {
    if (userId) {
      getUserLoggedData(userId);
    }
  }, [userId]);


  //Notifications de erros da API
  const [alertContext, setAlertContext] = useState<TAlertProps>({
    show: false,
    title: "",
    message: "",
    type: ""
  });

  const handleAlert = ({ title, message, type }: { title: string; message: string; type: string }) => {
    setAlertContext({
      show: true,
      title,
      message,
      type
    });
    setTimeout(() => {
      setAlertContext(prevState => ({
        ...prevState,
        show: false,
        title: "",
        message: "",
        type: ""
      }));
    }, 5000);
  };


  //Lista de Roles
  const [rolesContext, setRolesContext] = useState<TGetRolesResponse[]>([]);
  async function getRolesData() {
    await RoleService.getRolesList().then(
      (rolesData) => {
        setRolesContext(rolesData)
      }
    ).catch(
      (error) => {
        setAlertContext({
          show: true,
          title: "Erros ao buscar as roles (funções)",
          message: `${error.message}`,
          type: "error"
        });
      }
    );
  }
  useEffect(() => {
    getRolesData()
  }, []);


  const contextValue: TAppContextProps = {
    userId,
    setUserId: setUserId as (userId: string) => void,
    userLoggedData,
    setUserLoggedData,
    alertContext,
    setAlertContext,
    rolesContext,
    setRolesContext,
    handleAlert,
    isLoadingUser,
    setIsLoadingUser
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um UserProvider');
  }
  return context;
};


export default AppProvider;