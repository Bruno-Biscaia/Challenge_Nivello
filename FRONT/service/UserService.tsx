import { fetchApiData } from '../models/utils/BaseApi';
import { TGetUserListByRoleIdResponse, TLoginResponse, TCreateUserResponse, TEditUserResponse } from '../models/Types/TUserService';
const baseUrl = 'api/v1/user';

export const userService = {
  // -> GET
  getUserListByRoleId: async (userId?: string, roleId?: number): Promise<TGetUserListByRoleIdResponse[]> => {
    let url = `${baseUrl}/list-users`;

    if (userId !== undefined) {
      url += `?currentUserId=${userId}`;
    } else if (roleId !== undefined) {
      url += `?roleId=${roleId}`;
    }
    return fetchApiData(url);
  },

  getUserById: async (userId: string): Promise<any> => {
    const url = `${baseUrl}/user/${userId}`;
    return fetchApiData(url);
  },

  // -> POST
  login: async ({ email, mainPassword }: TLoginResponse): Promise<any> => {
    const url = `${baseUrl}/login`;
    const data = { email, mainPassword };

    return fetchApiData(url, data, 'post');
  },

  createUser: async (
    userId: string,
    fullName: string,
    email: string,
    roleId: number,
    mainPassword: string
  ): Promise<TCreateUserResponse> => {
    const url = `${baseUrl}/user?currentUserId=${userId}`;
    const data = { userId, fullName, email, roleId, mainPassword };

    return fetchApiData(url, data, 'post');
  },

  // -> PUT
  // Método para editar um usuário
  editUser: async (
    userId: string,
    userLoggedId: string,
    fullName: string,
    roleId: number
  ): Promise<TEditUserResponse> => {
    const url = `${baseUrl}/user-edit/${userId}${userLoggedId ? `?currentUserId=${userLoggedId}` : ''}`;
    const data = { userId, userLoggedId, fullName, roleId };

    return fetchApiData(url, data, 'put');
  }


  // -> DELETE

};

