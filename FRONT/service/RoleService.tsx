import { TGetRolesResponse } from '@/models/Types/TRoleService';
import { fetchApiData } from '../models/utils/BaseApi';
const baseUrl = 'api/v1/role';

export const RoleService = {

  //MÉTODO - GET 
  getRolesList: async (): Promise<TGetRolesResponse[]> => {
    const url = `${baseUrl}/roles`;
    return fetchApiData(url);
  }

  //MÉTODO - POST  

  //MÉTODO - PUT

  // MÉTODO - DELETE


};

